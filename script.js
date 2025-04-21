document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const radioBtns = document.querySelectorAll('.new input[name="priority"]');
    const note = document.querySelector('.new .note');
    const addBtn = document.querySelector('.new .addbtn');

    // create a new task input
    function createTaskInput(isFirst = false) {
      const li = document.createElement('li');
      li.className = 'task-item';
  
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Enter a task...';
      input.className = 'task-input';
  
      li.appendChild(input);
  
      // Only add remove button if it's not the first input
      if (!isFirst) {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✖';
        removeBtn.className = 'remove-task';
  
        // Remove the task line when clicking the button
        removeBtn.addEventListener('click', () => {
          li.remove();
        });
  
        li.appendChild(removeBtn);
      }
  
      return li;
    }

    function createNote(){
        const note = document.createElement('div');
        note.className = 'note' + ' ' + document.querySelector('.new input[name="priority"]:checked').value;

        // Add pin to the note
        const pin = document.createElement('div');
        pin.className = 'pin'; 
        note.appendChild(pin);

        
        const content = document.createElement('div');  
        content.className = 'note-content';
        note.appendChild(content);

        const type = document.createElement('h3');
        type.textContent = document.querySelector('.new .type-input').value; 
        content.appendChild(type);

        const unorderedList = document.createElement('ul'); 
        content.appendChild(unorderedList);

        const taskItems = taskList.querySelectorAll('.task-item');
        taskItems.forEach((taskItem) => {
            const taskText = taskItem.querySelector('.task-input').value;
            const li = document.createElement('li');
            li.textContent = taskText;
            unorderedList.appendChild(li);
        });
        return note;
    }
  
    // Press Enter to add a new task
    taskList.addEventListener('keydown', (e) => {
      if (e.target.classList.contains('task-input') && e.key === 'Enter') {
        e.preventDefault();
        const newTask = createTaskInput();
        taskList.appendChild(newTask);
        newTask.querySelector('.task-input').focus();
      }
    });
    addBtn.addEventListener('click', () => {
        // Create a new note with the tasks
        const note = createNote();
        document.querySelector('.todo').appendChild(note);
        
        // Clear the task list after creating the note
        taskList.innerHTML = '';
        taskList.appendChild(createTaskInput(true));
    });
    radioBtns.forEach((radioBtn) => {
      radioBtn.addEventListener('change', () => {
        // Update the note with the selected priority
          note.classList.remove('lowprio', 'medprio', 'highprio');
          note.classList.add(radioBtn.value);
      });
    });
    

    // Initialize the first inputbox without a remove button
    taskList.innerHTML = '';
    taskList.appendChild(createTaskInput(true));
  });
  