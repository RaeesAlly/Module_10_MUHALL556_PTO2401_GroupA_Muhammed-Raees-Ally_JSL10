document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json')
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            })
            .catch(error => console.error('Error fetching books:', error));
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async']);
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async', 'closure']);
        
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        
        const unlockCode = commonConcepts.has('async') ? 'async' : 'No async concept found';
        
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${unlockCode}`;
    });

    document.getElementById("solveRoom3").addEventListener("click", () => {
        fetch('directions.json')
            .then(response => response.json())
            .then(directions => {
                navigateLabyrinth(directions)
                    .then(message => {
                        document.getElementById("room3Result").textContent = message;
                    });
            })
            .catch(error => console.error('Error fetching directions:', error));
    });
});

function findMostRecentBook(books) {
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

function findIntersection(setA, setB) {
    const intersection = new Set([...setA].filter(concept => setB.has(concept)));
    return intersection;
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
