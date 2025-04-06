    
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize variables
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();
            
            // Populate year select (10 years back and 10 years forward)
            const yearSelect = document.getElementById('year-select');
            for (let i = currentYear - 10; i <= currentYear + 10; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                yearSelect.appendChild(option);
            }
            yearSelect.value = currentYear;
            
            // Set month select to current month
            document.getElementById('month-select').value = currentMonth;
            
            // Generate calendar
            generateCalendar(currentMonth, currentYear);
            
            // Event listeners for navigation
            document.getElementById('prev-month').addEventListener('click', function() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                updateCalendar();
            });
            
            document.getElementById('next-month').addEventListener('click', function() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                updateCalendar();
            });
            
            document.getElementById('today').addEventListener('click', function() {
                currentDate = new Date();
                currentMonth = currentDate.getMonth();
                currentYear = currentDate.getFullYear();
                updateCalendar();
            });
            
            // Event listeners for select controls
            document.getElementById('month-select').addEventListener('change', function() {
                currentMonth = parseInt(this.value);
                updateCalendar();
            });
            
            document.getElementById('year-select').addEventListener('change', function() {
                currentYear = parseInt(this.value);
                updateCalendar();
            });
            
            // Auto-save functionality
            document.addEventListener('blur', function(e) {
                if (e.target.classList.contains('day-content')) {
                    const dayId = e.target.parentElement.getAttribute('data-day-id');
                    localStorage.setItem(`calendar-${dayId}`, e.target.value);
                }
            }, true);
            
            function updateCalendar() {
                document.getElementById('month-select').value = currentMonth;
                document.getElementById('year-select').value = currentYear;
                generateCalendar(currentMonth, currentYear);
            }
            
            function generateCalendar(month, year) {
                // Update month/year display
                const monthNames = ["January", "February", "March", "April", "May", "June",
                                   "July", "August", "September", "October", "November", "December"];
                document.getElementById('current-month-year').textContent = 
                    `${monthNames[month]} ${year}`;
                
                // Get first day of month and total days
                const firstDay = new Date(year, month, 1);
                const startingDay = firstDay.getDay(); // 0-6 (Sun-Sat)
                
                // Get total days in month
                const totalDays = new Date(year, month + 1, 0).getDate();
                
                // Get days from previous month to show
                const prevMonthDays = new Date(year, month, 0).getDate();
                
                // Clear existing days (keep headers)
                const calendarGrid = document.getElementById('calendar-grid');
                while (calendarGrid.children.length > 7) {
                    calendarGrid.removeChild(calendarGrid.lastChild);
                }
                
                // Add days from previous month (if needed)
                for (let i = 0; i < startingDay; i++) {
                    const dayElement = createDayElement(
                        prevMonthDays - startingDay + i + 1,
                        month - 1,
                        year,
                        true
                    );
                    calendarGrid.appendChild(dayElement);
                }
                
                // Add days from current month
                const today = new Date();
                for (let i = 1; i <= totalDays; i++) {
                    const isToday = today.getDate() === i && 
                                   today.getMonth() === month && 
                                   today.getFullYear() === year;
                    const dayElement = createDayElement(i, month, year, false, isToday);
                    calendarGrid.appendChild(dayElement);
                }
                
                // Calculate how many days from next month to show
                const totalCells = Math.ceil((totalDays + startingDay) / 7) * 7;
                const nextMonthDaysToShow = totalCells - (totalDays + startingDay);
                
                // Add days from next month (if needed)
                for (let i = 1; i <= nextMonthDaysToShow; i++) {
                    const dayElement = createDayElement(i, month + 1, year, true);
                    calendarGrid.appendChild(dayElement);
                }
            }
            
            function createDayElement(day, month, year, isOtherMonth, isToday = false) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                if (isOtherMonth) dayElement.classList.add('other-month');
                if (isToday) dayElement.classList.add('today');
                
                // Create unique ID for saving data
                const dayId = `${year}-${month}-${day}`;
                dayElement.setAttribute('data-day-id', dayId);
                
                // Day number
                const dayNumber = document.createElement('div');
                dayNumber.className = 'day-number';
                dayNumber.textContent = day;
                dayElement.appendChild(dayNumber);
                
                // Editable content area
                const content = document.createElement('textarea');
                content.className = 'day-content';
                content.placeholder = '';
                
                // Load saved content if available
                const savedContent = localStorage.getItem(`calendar-${dayId}`);
                if (savedContent) {
                    content.value = savedContent;
                }
                
                // Auto-resize textarea
                content.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
                
                dayElement.appendChild(content);
                
                return dayElement;
            }
            
            // Trigger input event on all textareas to set correct initial height
            setTimeout(() => {
                document.querySelectorAll('.day-content').forEach(textarea => {
                    textarea.dispatchEvent(new Event('input'));
                });
            }, 100);
        });
    