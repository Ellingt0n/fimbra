$(document).ready(function() {
    $('.filter__select').on('click', function(e) {
        e.stopPropagation();
        var $this = $(this);
        var $dropdown = $this.find('.company-content__dropdown');
        
        $('.filter__select').not($this).removeClass('active').find('.company-content__dropdown').removeClass('show');
        
        $this.toggleClass('active');
        $dropdown.toggleClass('show');
    });
    
    $('.company-content__dropdown-item').on('click', function(e) {
        e.stopPropagation();
        var $item = $(this);
        var $select = $item.closest('.filter__select');
        var text = $item.text();
        
        $select.find('.filter__text').text(text);
        $select.removeClass('active').find('.company-content__dropdown').removeClass('show');
    });
    
    $(document).on('click', function() {
        $('.filter__select').removeClass('active').find('.company-content__dropdown').removeClass('show');
    });
    
    $('.company-content__top-filter').on('click', function() {
        $('.company-content__sidebar').addClass('active');
        $('.company-sidebar-overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });
    
    $('.company-sidebar-overlay').on('click', function() {
        $('.company-content__sidebar').removeClass('active');
        $('.company-sidebar-overlay').removeClass('active');
        $('body').css('overflow', '');
    });
});