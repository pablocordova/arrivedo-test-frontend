(function(){
  'use strict';
  angular.module("app")
  .factory("serverService", ['$http', serverService]);

    /**
     *  serverService is going to simulate real server with localStorage
     */

    function serverService($http) {

      var serverService = {
        addNote : addNote,
        getNotes : getNotes,
        removeNote: removeNote
      };

      return serverService;

      /**
       * PUBLIC FUNCTIONS
       */

      function addNote(note) {
        let notes = getNotesFromLocalStorage();
        // Add id for note
        note.id = Date.now()
        notes.push(note);
        updateNotesToLocalStorage(notes);
      };

      function getNotes() {
        return getNotesFromLocalStorage();
      };

      function removeNote(id) {
        const notes = getNotesFromLocalStorage();
        const newNotes = notes.filter(note => {
          return note.id != id;
        })
        updateNotesToLocalStorage(newNotes);
      }

      /**
       * PRIVATE FUNCTIONS
       */

      /**
       * Get and decode notes from Local Storage
       */ 

      function getNotesFromLocalStorage() {
        const notesString = localStorage.getItem('notesArrivedo160118');
        return  notesString ? JSON.parse(notesString) : []
      }

      /**
       * Code and save notes to Local Storage
       * @params array { notesArray } : array to save
       */ 

      function updateNotesToLocalStorage(notesArray) {
        const notesString = JSON.stringify(notesArray);
        localStorage.setItem('notesArrivedo160118', notesString)
      }

    }

})();
