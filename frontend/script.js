// script.js

// Function to shorten URL
const backendURL = 'http://localhost:8080';
function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value;
    const expiryDate = document.getElementById('expiryDate').value || null;
    const title = document.getElementById('title').value || null;
    const description = document.getElementById('description').value || null;

    // Check if the long URL is provided
    if (!longUrl) {
        alert('Please enter a valid long URL.');
        return;
    }

    // Prepare the request body
    const requestBody = {
        longUrl,
        expiryDate,
        title,
        description,
    };

    // Perform the AJAX request to shorten the URL
    // http://localhost:8001/
    fetch(`${backendURL}/api/shorten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
// ... (your existing code)

// ... (your existing code)

// ... (your existing code)

.then(data => {
    // Display the shortened URL on the index page
    const shortenedUrlDisplay = document.getElementById('shortenedUrlDisplay');
    // shortenedUrlDisplay.href = `http://localhost:8001/api/${data.shortenedURL}`;
    shortenedUrlDisplay.textContent = `Shortened URL: ${backendURL}/api/${data.shortenedURL}`;

    // Add the ability to copy the shortened URL to the clipboard
    shortenedUrlDisplay.addEventListener('click', function () {
        const el = document.createElement('textarea');
        el.value = shortenedUrlDisplay.href;
        document.body.appendChild(el);
        el.select();
        // document.execCommand('copy');
        document.body.removeChild(el);

        // alert('Shortened URL copied to clipboard!');
    });

    // Clear input fields
    document.getElementById('longUrl').value = '';
    document.getElementById('expiryDate').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
})
.catch(error => {
    console.error('Error shortening URL:', error);
    alert('An error occurred while shortening the URL.');
});

}

// Function to copy shortened URL to clipboard
function copyToClipboard() {
    const shortenedUrlInput = document.getElementById('shortenedUrlInput');
    shortenedUrlInput.select();
    document.execCommand('copy');
    alert('Shortened URL copied to clipboard!');
}


// Handle the click event directly on the anchor tag
// document.getElementById('shortenedUrlDisplay').addEventListener('click', function (event) {
//     event.preventDefault(); // Prevent the default link behavior
//     // Perform the AJAX request to redirect the user based on the short URL

//     fetch(`http://localhost:8001/api/${document.getElementById('shortenedUrlDisplay').innerText}`)
//         .then(response => {
//             if (response.ok) {
//                 // Redirect the user to the actual URL
//                 window.location.href = response.url;
//             } else {
//                 // Handle the case where the short URL is not found
//                 console.error('Short URL not found');
//                 alert('Short URL not found');
//             }
//         })
//         .catch(error => {
//             console.error('Error redirecting:', error);
//             alert('An error occurred while redirecting.');
//         });
// });


// Function to fetch all URLs
// Add these functions to script.js
function handleOperationChange() {
    const selectedOperation = document.getElementById('operation').value;

    // Hide/show input fields based on the selected operation
    document.getElementById('shortUrlInput').style.display = 'none';
    document.getElementById('expiryDateInput').style.display = 'none';

    if (selectedOperation === 'update') {
        document.getElementById('shortUrlInput').style.display = 'block';
        document.getElementById('expiryDateInput').style.display = 'block';
    } else if (selectedOperation === 'delete' || selectedOperation === 'details' || selectedOperation === 'visitors') {
        document.getElementById('shortUrlInput').style.display = 'block';
    }
}

function performOperation() {
    const selectedOperation = document.getElementById('operation').value;
    const shortUrl = document.getElementById('shortUrl').value;

    let requestBody = {};
  // Hide all input fields by default
  document.getElementById('shortUrlInput').style.display = 'none';
  document.getElementById('expiryDateInput').style.display = 'none';

  // Show input field based on the selected operation
  if (selectedOperation !== '') {
      document.getElementById('shortUrlInput').style.display = 'block';
  }

  // Show additional input fields based on the selected operation
  if (selectedOperation === 'update') {
      document.getElementById('expiryDateInput').style.display = 'block';
  }
    if (selectedOperation === 'update') {
        const expiryDate = document.getElementById('expiryDate').value;
        requestBody = { expiryDate };
    }
 const operationResult = document.getElementById('operationResult');

    // Clear any previous results
    operationResult.innerHTML = '';

    // Define the API endpoint based on the selected operation
    let apiEndpoint;
    if (selectedOperation === 'delete') {
        apiEndpoint =`${backendURL}/api/${shortUrl}`;
        fetch(apiEndpoint, {
            method: 'DELETE', // Use 'DELETE' for the delete operation
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            // Display the result in the output area
            operationResult.textContent = JSON.stringify(data);
        })
        .catch(error => {
            console.error(`Error performing ${selectedOperation} operation:`, error);
            alert(`An error occurred while performing ${selectedOperation} operation.`);
        });
        // Perform the AJAX request based on the selected operation
    } 
    else if(selectedOperation=='update'){
        // Perform the AJAX request based on the selected operation
   
    fetch(`${backendURL}/api/${shortUrl}`, {
        method: 'PUT', // Adjust the method based on your backend route
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        // Display the result in the operationResult div
        // const operationResult = document.getElementById('operationResult');
        // operationResult.textContent = JSON.stringify(data);
        alert(data.message);
    })
    .catch(error => {
        console.error('Error performing operation:', error);
        alert('An error occurred while performing the operation.');
    });
    }
    else if (selectedOperation === 'details') {
        // Perform the AJAX request to get URL details
        apiEndpoint = `${backendURL}/api/details/${shortUrl}`;
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                // Display the URL details in the operationResult div
                operationResult.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            })
            .catch(error => {
                console.error(`Error performing ${selectedOperation} operation:`, error);
                alert(`An error occurred while performing ${selectedOperation} operation.`);
            });
    }
    else if(selectedOperation == 'visitors'){
        apiEndpoint = `${backendURL}/api/visitors/${shortUrl}`;
        fetch(apiEndpoint)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error fetching visitors:', response.statusText);
                alert('An error occurred while fetching visitors.');
            }
        })
        .then(visitors => {
            // Display or process the visitors' information as needed
            console.log('Visitors:', visitors);
            operationResult.textContent = 'Visitors: ' + JSON.stringify(visitors);
        })
        .catch(error => {
            console.error('Error fetching visitors:', error);
            alert('An error occurred while fetching visitors.');
        });
    }

    else {
        // If there are other operations in the future, define their endpoints here
        // Example: apiEndpoint = `http://localhost:8001/api/${selectedOperation}/${shortUrl}`;
    }

    
}


function getAllUrls() {
    // Perform the AJAX request to fetch all URLs
    fetch(`${backendURL}/api/allUrls`)
    .then(response => response.json())
    .then(data => {
        const urlList = document.getElementById('urlList');

        // Clear existing list items
        urlList.innerHTML = '';

        // Append each URL to the list
        data.forEach(url => {
            const listItem = document.createElement('li');
            listItem.className = 'urlItem';

            const link = document.createElement('a');
            link.href = url.shortUrl;
            link.textContent = url.shortUrl;

            listItem.appendChild(link);
            urlList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching all URLs:', error);
        alert('An error occurred while fetching all URLs.');
    });
}

// Add this function to redirect to the dashboard
function goToDashboard() {
    window.location.href = 'dashboard.html';
}

// Add this function to your script.js
function goToUrlShortner() {
    // Redirect to index.html
    window.location.href = 'index.html';
}

















// function shortenURL() {
//     const originalURL = document.getElementById("originalURL").value;

//     fetch("http://localhost:8001/shorten", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ originalURL }),
        
//     })
//     .then(response => response.json())
//     .then(data => {
        
//         document.getElementById("shortenedURL").textContent = data.shortenedURL;
//         document.getElementById("shortenedURL").href = data.shortenedURL;
        
//     })
//     .catch(error => {
//         console.error("Error:", error);
//     });
   
// }
