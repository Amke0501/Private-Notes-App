import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Helper to create authenticated supabase client
const getAuthenticatedClient = (token) => {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  );
};

/**
 * GET /api/notes
 * Get all notes for the authenticated user
 * RLS policy will automatically filter by user_id
 */
router.get('/', async (req, res) => {
  try {
    const supabase = getAuthenticatedClient(req.token);
    
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ notes: data });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/notes
 * Create a new note for the authenticated user
 */
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ 
        error: 'Title and content are required' 
      });
    }

    const supabase = getAuthenticatedClient(req.token);
    
    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title,
          content,
          user_id: req.user.id
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ 
      message: 'Note created successfully',
      note: data 
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/notes/:id
 * Update an existing note
 * RLS policy ensures user can only update their own notes
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ 
        error: 'Title and content are required' 
      });
    }

    const supabase = getAuthenticatedClient(req.token);
    
    const { data, error } = await supabase
      .from('notes')
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Note not found or access denied' });
    }

    res.json({ 
      message: 'Note updated successfully',
      note: data 
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/notes/:id
 * Delete a note
 * RLS policy ensures user can only delete their own notes
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const supabase = getAuthenticatedClient(req.token);
    
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
