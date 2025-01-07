async function fetchData() {
    try {
        // document.getElementById('loading').style.display = 'block';
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        renderData(await response.json());
    } catch (error) {
        console.error('Fetch error:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function renderData(data) {
    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = data.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>
    `).join('');
}

fetchData();
