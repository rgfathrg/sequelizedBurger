$(function() {
    $(".devour").on("click", function(event) {
        event.preventDefault();
        console.log("success");
        
        var id = $(this).data("id");
        console.log(id);
        var devoured = $(this).data("devoured");
        devoured = 1;
        var newDev = {
            devour: devoured
        };
        console.log(devoured);

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDev
        }).then(
            function() {
                console.log("Burger has been devoured!");
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            name: $("#ca").val().trim(),
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("New burger added!");
                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function(event) {
        var id = $(this).data("id");
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("deleted burger: ", id);
                location.reload();
            }
        );
    });
});