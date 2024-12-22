// Function to fetch data from the API
async function fetchData() {
    try {
        // Show loading indicator
        document.getElementById('loading').style.display = 'block';

        // Fetch data from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const data = await response.json();

        // Render the data in the table
        renderData(data);
    } catch (error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    } finally {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';
    }
}

// Function to render data in the table
function renderData(data) {
    const dataBody = document.getElementById('dataBody');
    
    // Clear existing rows
    dataBody.innerHTML = '';

    // Add rows for each item
    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        `;
        dataBody.appendChild(row);
    });
}

// Call fetchData to get the data and render it
fetchData();
