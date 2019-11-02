// use Jquery to listen for event 'keyup'
// Send request to .../instant-search
    // Parse response
    // Update the view in id='productSearchResults'
// Create route

$(() => {
    $('#instantSearch').on('keyup', function() {
        if ($('#instantSearch').val() != '') {
            $.ajax({
                type: "POST",
                url: '/api/products/instant-search',
                data: {
                    searchText: $('#instantSearch').val()
                },
                dataType: 'json',
                success: (result) => {
                    console.log(result);
                    $('#productSearchResults').empty()
                    for (item of result.data) {
                        $('#productSearchResults').append(`
                    <div class="col">
            <div class="card" style="width: 18rem;">
                <a href="/api/products/${product._id}">
                    <img class="card-img-top" src="/images/placeholder.jpg" alt="Card image cap" />
                </a>
                <div class="card-body">
                    <h5 class="card-title">Name: ${item._source.name}</h5>
                    <p class="card-text">Category: ${item._source.category.name}</p>
                    <p class="card-text">$${item._source.price}</p>
                    <center><a href="/api/products/${item._id}" class="btn btn-primary" style="width: 9vw;">Buy</a></center>
                </div>
            </div>
        </div>`)
        }
        
                }
            })
        }
    })
})