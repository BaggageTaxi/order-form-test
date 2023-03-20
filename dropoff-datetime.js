$(document).ready(function() {

    // Get the current date and time
    let now = new Date();

    let allAllowTimes = [
                          "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                          "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
                          "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
                          "22:00", "22:30", "23:00"
                        ];
    let reducedAllowTimes = [
                          "07:00", "08:30", "09:00", "11:00", "11:30",
                          "12:00", "12:30", "13:30", "16:00", "16:30",
                          "17:00", "17:30", "18:00", "18:30", "21:30",
                          "22:30", "23:00"
                        ]

    // Get the minimum and maximum date and time for the picker
    let minDateTime = new Date();
    minDateTime.setHours(now.getHours() + 4);

    let minTime = new Date();
    minTime.setHours(7, 0, 0, 0);
    let maxTime = new Date();
    maxTime.setHours(23, 1, 0, 0);

    // Create the date and time picker
    let picker = $('#dropoffDateTime').datetimepicker({
      format:'Y/m/d H:i',
      formatTime:'H:i',
      formatDate:'Y/m/d',
      startDate: 0,
      step: 30,
      closeOnDateSelect:false,
      closeOnTimeSelect:true,
      closeOnWithoutClick:true,
      closeOnInputClick:true,
      timepicker:true,
      datepicker:true,
      minDate: now,
      minTime: minTime,
      maxTime: maxTime,
      minDateTime: minDateTime,
      mask: true,

      defaultTime: false,
      defaultDate: false,
      opened: false,
      withoutCopyright:true,
      hours12: false,

      allowTimes: allAllowTimes,

      onSelectDate: function(ct, $i) {

          // Get the selected date as a string
          let selectedDate = new Date(ct).toISOString().split('T')[0];

          $i.datetimepicker({value: selectedDate});

          var timeslotMockUrls = [
            "https://run.mocky.io/v3/9d381999-5112-4370-abaf-675107b2ad59",
            "https://run.mocky.io/v3/1fc0e8b6-98cf-4e82-8d09-d9cf4215a56e",
            "https://run.mocky.io/v3/73c6d6fc-ef27-488c-850f-fc32d89d1291"
          ];
          url = timeslotMockUrls[Math.floor(Math.random() * timeslotMockUrls.length)];

          // Call the API to fetch the available time slots for the selected date
          fetch(url + "?date=" + selectedDate,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(function(response) {
                if (!response.ok) {
                    return allAllowTimes;
                }
                return response.json();
            })
            .then(function(timeslots) {
                alert("Timeslots: " + timeslots);
                $i.allowTimes = timeslots;
            })
            .catch(function(err) {
                $i.datetimepicker({allowTimes: reducedAllowTimes});
            });
        },

    });
});