function submitForm() {
    const avatarName = document.getElementById("avatarName").value;
    const childAge = document.getElementById("childAge").value;
    const skinColor = document.getElementById("skinColor").value;
    const hairstyle = document.getElementById("hairstyle").value;
    const headShape = document.getElementById("headShape").value;
    const upperClothing = document.getElementById("upperClothing").value;
    const lowerClothing = document.getElementById("lowerClothing").value;

    const data = {
        avatarName,
        childAge: parseInt(childAge),
        skinColor,
        hairstyle,
        headShape,
        upperClothing,
        lowerClothing
    }

    fetch("/api/avatars", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa("marie@home.edu:123")
        },
        body: JSON.stringify(data)
    })
}
