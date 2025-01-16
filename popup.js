document.addEventListener('DOMContentLoaded', function () {
    // Load saved assignments from storage
    chrome.storage.local.get(['assignments'], function (result) {
      if (result.assignments) {
        // Render saved assignments
        result.assignments.forEach(function (assignment) {
          renderAssignment(assignment);
        });
      }
    });
  
    // Get the assignment form
    var assignmentForm = document.getElementById('assignment-form');
  
    // Add event listener to the form submission
    assignmentForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get the input values
      var assignmentNameInput = document.getElementById('assignment-name');
      var assignmentClassInput = document.getElementById('assignment-class');
      var assignmentDateInput = document.getElementById('assignment-date');
  
      // Check if the input elements exist
      if (assignmentNameInput && assignmentClassInput && assignmentDateInput) {
        // Get the values from the input elements
        var assignmentName = assignmentNameInput.value;
        var assignmentClass = assignmentClassInput.value;
        var assignmentDate = assignmentDateInput.value;
  
        // Create an assignment object
        var assignment = {
          name: assignmentName,
          class: assignmentClass,
          date: assignmentDate
        };
  
        // Save the assignment to storage
        chrome.storage.local.get(['assignments'], function (result) {
          var assignments = result.assignments || [];
          assignments.push(assignment);
          chrome.storage.local.set({ assignments: assignments });
  
          // Render the new assignment
          renderAssignment(assignment);
  
          // Clear the input fields
          assignmentNameInput.value = '';
          assignmentClassInput.value = '';
          assignmentDateInput.value = '';
        });
      }
    });
  
    /**
     * Render an assignment item in the UI
     * @param {object} assignment - The assignment object
     */
    function renderAssignment(assignment) {
      var assignmentsContainer = document.getElementById('assignments-container');
  
      // Create the assignment item
      var assignmentItem = document.createElement('div');
      assignmentItem.classList.add('assignment-item');
  
      // Create the assignment name element
      var nameElement = document.createElement('p');
      nameElement.classList.add('assignment-name');
      nameElement.textContent = 'Assignment Name: ' + assignment.name;
  
      // Create the assignment class element
      var classElement = document.createElement('p');
      classElement.classList.add('assignment-class');
      classElement.textContent = 'Assignment Class: ' + assignment.class;
  
      // Create the assignment date element
      var dateElement = document.createElement('p');
      dateElement.classList.add('assignment-date');
      dateElement.textContent = 'Assignment Due By: ' + assignment.date;
  
      // Create the delete button
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        // Remove the assignment from storage
        chrome.storage.local.get(['assignments'], function (result) {
          var assignments = result.assignments || [];
          var updatedAssignments = assignments.filter(function (item) {
            return item.name !== assignment.name;
          });
          chrome.storage.local.set({ assignments: updatedAssignments });
  
          // Remove the assignment from the UI
          assignmentsContainer.removeChild(assignmentItem);
        });
      });
  
      // Add elements to the assignment item
      assignmentItem.appendChild(nameElement);
      assignmentItem.appendChild(classElement);
      assignmentItem.appendChild(dateElement);
      assignmentItem.appendChild(deleteButton);
  
      // Add the assignment item to the container
      assignmentsContainer.appendChild(assignmentItem);
    }
  });
  