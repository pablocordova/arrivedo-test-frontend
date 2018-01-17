(function(){
  'use strict';

  angular.module("app")
  .controller("controlController", ['serverService', controlController]);

    function controlController(serverService) {

      var vm = this;

      // Variables

      vm.notes = [];
      vm.notesTable = [];
      vm.note = {
        text: '',
        id: ''
      };
      vm.errorNote = false;
      vm.textReference = '';

      // Initial function executed, to initialize data

      getInitialData();

      /**
       * PUBLIC FUNCTIONS
       */

      /**
       * Add one note to array of notes
       */

      vm.addNote = function() {

        const noteText = vm.note.text;
        // Validate if text exist
        if (!noteText) {
          vm.errorNote = true
        } else {
          vm.errorNote = false
          serverService.addNote(vm.note);
          getInitialData();
          // Clean data
          cleanData();
        }
      }

      /**
       * Filter notes by text
       *
       * Search if all words written in the text are in one or more notes
       */

      vm.filterTableNotes = function() {

        const text = vm.textReference;
        let notesFiltered = vm.notes

        let wordsToSearch = text.toLowerCase().split(' ')
        // Search word by word and filter by all words
        for (let word of wordsToSearch) {
          notesFiltered = notesFiltered.filter(e =>{
            return e.text.toLowerCase().indexOf(word) !== -1
          })
        }
        // Result in table
        vm.notesTable = notesFiltered

      }

      /**
       * Remove 1 note of notes array
       * @param number { id } : note id to remove 
       */

      vm.removeNote = function(id) {
        serverService.removeNote(id);
        getInitialData();
        // Clean text in filter
        vm.textReference = '';
      }


      /**
       * PRIVATE FUNCTIONS
       */

      function cleanData() {
        vm.note.text = '';
        vm.textReference = '';
      }

      /**
       * get notes and note for Table saved
       */

      function getInitialData() {
        vm.notes = serverService.getNotes();
        vm.notesTable = vm.notes;
      }
    }

})();

