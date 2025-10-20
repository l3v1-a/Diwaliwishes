
document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('nameForm');
    const fireworksContainer = document.querySelector('.fireworks');

    // Create fireworks
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        firework.style.animationDelay = `${Math.random() * 2}s`;
        fireworksContainer.appendChild(firework);
    }

    if (nameForm) {
        nameForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('nameInput');
            const name = nameInput.value;

            try {
                const response = await fetch('/api/visitor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                });

                if (response.ok) {
                    window.location.href = `wishes.html?name=${encodeURIComponent(name)}`;
                } else {
                    console.error('Failed to save visitor');
                }
            } catch (error) {
                console.error('Error saving visitor:', error);
            }
        });
    }

    const diwaliGreeting = document.getElementById('diwaliGreeting');
    const randomWish = document.getElementById('randomWish');

    if (diwaliGreeting) {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');

        const wishes = [
            "May the divine light of Diwali spread into your life and bring peace, prosperity, happiness, and good health.",
            "Wishing you a festival of lights that's as bright as you are. Happy Diwali!",
            "May the beauty of Diwali fill your home with happiness, and may the coming year provide you with everything that brings you joy.",
            "Let the glow of the diyas light up your path towards growth and success. Happy Diwali!",
            "May this Diwali bring you endless moments of joy and love."
        ];

        if (name) {
            setTimeout(() => {
                diwaliGreeting.textContent = `Happy Diwali, ${name}!`;
                const randomIndex = Math.floor(Math.random() * wishes.length);
                randomWish.textContent = wishes[randomIndex];
            }, 1000);
        }
    }
});
