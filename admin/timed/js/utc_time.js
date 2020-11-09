function displayTime()
{
    var date = new Date(); 
    var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());    

    document.querySelector("#utc_time").innerHTML = 
    `
        UTC time: <span style="margin-left: 20px"> ${date.getUTCHours()} : ${date.getUTCMinutes()}</span>
    `;
}