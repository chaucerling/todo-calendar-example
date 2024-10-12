import React, { useState } from 'react';
import { Note } from '../types';
import { Trash2, Edit, Save, Plus } from 'lucide-react';

interface NotepadProps {
  notes: Note[];
  onAddNote: (content: string) => void;
  onUpdateNote: (id: number, content: string) => void;
  onDeleteNote: (id: number) => void;
  selectedDate: Date;
}

const Notepad: React.FC<NotepadProps> = ({ notes, onAddNote, onUpdateNote, onDeleteNote, selectedDate }) => {
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      onUpdateNote(editingId, editContent);
      setEditingId(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-800">
        Notes for {selectedDate.toLocaleDateString()}
      </h2>
      <div className="mb-6">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a new note..."
          className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
          rows={3}
        />
        <button
          onClick={handleAddNote}
          className="mt-3 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="mr-2" size={20} />
          Add Note
        </button>
      </div>
      <div className="space-y-6">
        {notes.map(note => (
          <div key={note.id} className="border border-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            {editingId === note.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-3 border border-indigo-200 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                  rows={3}
                />
                <button
                  onClick={saveEdit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
                >
                  <Save className="mr-2" size={20} />
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="mb-4 text-gray-700">{note.content}</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => startEditing(note)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center"
                  >
                    <Edit className="mr-2" size={20} />
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
                  >
                    <Trash2 className="mr-2" size={20} />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notepad;