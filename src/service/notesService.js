import axios from "axios";

const notesUrl = "test";

export const notesService = {
  getNotes: async (ergid) => {
    try {
      const { data } = await axios.get(notesUrl);
      return data.notes;
    } catch (error) {
      return {
        error,
      };
    }
  },

  createNote: async ({ note, id }) => {
    try {
      if (!note) throw new Error("Note is missing");

      const { data } = await axios.post(notesUrl, { note });
      if (!data || !data.notes) {
        throw new Error("Invalid response from server");
      }
      return data.notes;
    } catch (error) {
      return {
        error,
      };
    }
  },

  updateNote: async ({ note, id }) => {
    try {
      if (!note) throw new Error("Note is missing");
      if (!id) throw new Error("Note id is missing");

      const { data } = await axios.put(`${notesUrl}/${id}`, { note });
      if (!data || !data.notes) {
        throw new Error("Invalid response from server");
      }
      return data.notes;
    } catch (error) {
      return {
        error,
      };
    }
  },

  deleteNote: async (id) => {
    try {
      const { data } = await axios.delete(`${notesUrl}/${id}`);
      if (!data || !data.notes) {
        throw new Error("Invalid response from server");
      }
      return data.notes;
    } catch (error) {
      return {
        error,
      };
    }
  },
};
