// 초기 배터리 수준 설정
let batteryLevel = 100;
let alarms = [];

// 시계를 시작하는 함수
function startClock() {
    const clock = document.getElementById('clock');
    setInterval(() => {
        if (batteryLevel > 0) {
            const now = new Date();
            const timeString = now.toTimeString().split(' ')[0]; // HH:MM:SS 형식으로 시간 얻기
            clock.textContent = timeString;
            checkAlarms(timeString);
        }
    }, 1000);
}

// 배터리 감소를 시작하는 함수
function startBatteryDrain() {
    const batteryElement = document.getElementById('battery-level');
    setInterval(() => {
        if (batteryLevel > 0) {
            batteryLevel--;
            batteryElement.textContent = `${batteryLevel}%`;
        }
        if (batteryLevel === 0) {
            document.getElementById('clock').textContent = '';
            document.body.style.backgroundColor = 'black';
        }
    }, 1000);
}

// 알람을 추가하는 함수
function addAlarm() {
    const alarmTime = document.getElementById('alarm-time').value;
    const alarmSound = document.getElementById('alarm-sound').files[0];

    if (alarms.length >= 3) {
        alert('Maximum of 3 alarms allowed.');
        return;
    }

    if (alarmTime && alarmSound) {
        const reader = new FileReader();
        reader.onload = function(e) {
            alarms.push({ time: alarmTime, sound: e.target.result });
            updateAlarmList();
        };
        reader.readAsDataURL(alarmSound);
    } else {
        alert('Please set a valid time and upload a sound for the alarm.');
    }
}

// 알람 리스트를 업데이트하는 함수
function updateAlarmList() {
    const alarmList = document.getElementById('alarms');
    alarmList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.textContent = alarm.time;
        li.classList.add('alarm-item');
        alarmList.appendChild(li);
    });
}

// 현재 시간과 알람 시간을 비교하는 함수
function checkAlarms(currentTime) {
    alarms.forEach((alarm, index) => {
        if (currentTime === alarm.time) {
            playAlarmSound(alarm.sound);
            alert(`Alarm ${index + 1} is ringing!`);
            alarms.splice(index, 1);
            updateAlarmList();
        }
    });
}

// 알람음을 재생하는 함수
function playAlarmSound(sound) {
    const audio = new Audio(sound);
    audio.play();
}

// 페이지가 로드되면 시계와 배터리 감소를 시작
window.onload = function() {
    startClock();
    startBatteryDrain();
};