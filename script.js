document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const radioBtns = document.querySelectorAll('.new input[name="priority"]');
    const note = document.querySelector('.new .note');

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
  
    // Press Enter to add a new task
    taskList.addEventListener('keydown', (e) => {
      if (e.target.classList.contains('task-input') && e.key === 'Enter') {
        e.preventDefault();
        const newTask = createTaskInput();
        taskList.appendChild(newTask);
        newTask.querySelector('.task-input').focus();
      }
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
  