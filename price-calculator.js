$(document).ready(function() {
  $("#pickupDateTime, #dropoffDateTime, #numberOfItems").on("change", function() {
    var pickupDateTime = $("#pickupDateTime").val();
    var dropoffDateTime = $("#dropoffDateTime").val();
    var numberOfItems = $("#numberOfItems").val();

    if (pickupDateTime && dropoffDateTime && numberOfItems) {
      $.ajax({
        type: "POST",
        url: "https://640052ef29deaba5cb34cb4a.mockapi.io/api/v1/price-calculator",
        contentType: "application/json",
        data: JSON.stringify({
          pickupDateTime: pickupDateTime,
          dropoffDateTime: dropoffDateTime,
          numberOfItems: numberOfItems
        }),
        success: function(data) {
          $("#priceCalculator").val(data.price);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $("#priceCalculator").val("");
        }
      });
    }
  });
});
