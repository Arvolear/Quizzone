function displayTime()
{
    var date = new Date(); 
    var nowHours = date.getUTCHours()
    var nowMinutes = date.getUTCMinutes()
    
    if (nowHours < 10)
    {
        nowHours = '0' + nowHours
    }

    if (nowMinutes < 10)
    {
        nowMinutes = '0' + nowMinutes
    }

    document.querySelector("#utc_time").innerHTML = 
    `
        UTC time: <span style="margin-left: 20px"> ${nowHours} : ${nowMinutes}</span>
    `;
}