$(document).ready(function() {
    function initPriceRange() {
        const $minSlider = $('#price-min');
        const $maxSlider = $('#price-max');
        const $progress = $('.price-range__progress');
        const $display = $('.price-range__display');
        
        function updateProgress() {
            let minVal = parseInt($minSlider.val());
            let maxVal = parseInt($maxSlider.val());
            const min = parseInt($minSlider.attr('min'));
            const max = parseInt($minSlider.attr('max'));
            
            if (minVal > maxVal) {
                const temp = minVal;
                minVal = maxVal;
                maxVal = temp;
                $minSlider.val(minVal);
                $maxSlider.val(maxVal);
            }
            
            const leftPercent = ((minVal - min) / (max - min)) * 100;
            const rightPercent = ((maxVal - min) / (max - min)) * 100;
            
            $progress.css({
                'left': leftPercent + '%',
                'width': (rightPercent - leftPercent) + '%'
            });
            
            $display.text(minVal + ' - ' + maxVal);
        }
        
        function handleMinSlider() {
            const minVal = parseInt($minSlider.val());
            const maxVal = parseInt($maxSlider.val());
            
            if (minVal >= maxVal) {
                $minSlider.val(maxVal - 1);
            }
            updateProgress();
        }
        
        function handleMaxSlider() {
            const minVal = parseInt($minSlider.val());
            const maxVal = parseInt($maxSlider.val());
            
            if (maxVal <= minVal) {
                $maxSlider.val(minVal + 1);
            }
            updateProgress();
        }
        
        $minSlider.on('input', handleMinSlider);
        $maxSlider.on('input', handleMaxSlider);
        
        updateProgress();
    }
    
    function handleSearchForm() {
        $('.search-bar__form').on('submit', function(e) {
            e.preventDefault();
            const searchValue = $('.search-bar__input').val();
            console.log('Поиск:', searchValue);
        });
    }
    
    function handleFilters() {
        $('.filters__apply-btn').on('click', function() {
            const filters = {
                sorting: $('.filters__select').val(),
                categories: [],
                countries: [],
                adTypes: [],
                priceMin: $('#price-min').val(),
                priceMax: $('#price-max').val(),
                date: $('.filters__date').val()
            };
            
            $('.checkbox-item__input:checked').each(function() {
                const $this = $(this);
                const groupLabel = $this.closest('.filters__group').find('.filters__label').text();
                
                if (groupLabel === 'Категории') {
                    filters.categories.push($this.attr('id'));
                } else if (groupLabel === 'Страна') {
                    filters.countries.push($this.attr('id'));
                } else if (groupLabel === 'Тип объявления') {
                    filters.adTypes.push($this.attr('id'));
                }
            });
            
            console.log('Применение фильтров:', filters);
        });
    }
    
    function handleDateInput() {
        const $dateInput = $('#date-filter');
        const $placeholder = $('.filters__date-placeholder');
        
        $dateInput.on('change', function() {
            if ($(this).val()) {
                $(this).addClass('has-value');
            } else {
                $(this).removeClass('has-value');
            }
        });
    }
    
    function handleCreateAdButton() {
        $('.search-bar__create-btn').on('click', function(e) {
            e.preventDefault();
            console.log('Создание объявления');
        });
    }
    
    function handleMobileFilters() {
        $('.ads-catalog__body-top-filter').on('click', function() {
            $('.ads-catalog__sidebar').addClass('active');
            $('.filters-overlay').addClass('active');
            $('body').css('overflow', 'hidden');
        });
        
        $('.filters-overlay').on('click', function() {
            $('.ads-catalog__sidebar').removeClass('active');
            $('.filters-overlay').removeClass('active');
            $('body').css('overflow', '');
        });
        
        $('.filters__apply-btn').on('click', function() {
            if ($(window).width() <= 1024) {
                $('.ads-catalog__sidebar').removeClass('active');
                $('.filters-overlay').removeClass('active');
                $('body').css('overflow', '');
            }
        });
    }
    
    
    
    initPriceRange();
    handleSearchForm();
    handleFilters();
    handleCreateAdButton();
    handleDateInput();
    handleMobileFilters();
});