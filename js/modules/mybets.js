exports('mybets', (params, done) => {
    insertHtmlModules({
        ".mybets": [
            "my-bets/my-bets.html"
        ]
    }, () => {
        console.log(`my bets`);
    });
});