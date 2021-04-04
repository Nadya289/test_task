function getUtcTime(){
    const now = new Date();
    const nowUTCHours = now.getUTCHours();
    const nowUTCTime = now.toUTCString().match(/\s\d+:\d+:\d+/)[0];
    if(nowUTCHours >= 12 && nowUTCHours < 18){
      console.log('Сейчас больше 12 часов и меньше 18 часов в часовом поясе UTC. Текущее время: ' + nowUTCTime);
    }else{
      console.log(nowUTCTime);
    }
  }
getUtcTime();

function getLocalTime(){
    const now = new Date();
    const nowHours = now.getHours();
    const nowLocalTime = now.toLocaleString().split(', ')[1];
    if(nowHours >= 12 && nowHours < 18){
        console.log('Сейчас больше 12 часов и меньше 18 часов в локальном часовом поясе. Текущее время: ' + nowLocalTime);
   }else{
       console.log(nowLocalTime);
   } 
}
getLocalTime();