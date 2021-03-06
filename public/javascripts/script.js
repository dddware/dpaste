(function($)
{
    function initPlaceHolders()
    {
        if ( ! ('placeholder' in document.createElement('input')))
        {
            $('[type=password][placeholder]').attr('placeholder', $('[type=password][placeholder]').eq(0).attr('placeholder'));
            var items = '[placeholder]';
            $(items).each(function()
            {
                var $this = $(this);
                if (($this.val() == '') && ($this.attr('placeholder')))
                    $this.val($this.attr('placeholder')).addClass('placeholder');
                else if ($this.val() == $this.attr('placeholder'))
                    $this.addClass('placeholder');
            });
            $(document).on('focus', items, function()
            {
                var $this = $(this);
                if ($this.val() == $this.attr('placeholder'))
                    $this.val('').removeClass('placeholder');
            });
            $(document).on('blur', items, function()
            {
                var $this = $(this);
                if (($this.val() == '') && ($this.attr('placeholder')))
                    $this.val($this.attr('placeholder')).addClass('placeholder');
            });
            $('form').on('submit', function()
            {
                var $this = $(this);
                $this.find('[placeholder]').each(function()
                {
                    if ($this.val() == $this.attr('placeholder'))
                        $this.val('').removeClass('placeholder');
                });
            });
        }
    }

    var leForm, code, setFormHeight = function()
    {
        var height = $('body').height() - 278;
        leForm.find('textarea').height(height);
    };

    $(function()
    {
        leForm = $('.leForm'), code = $('code');

        $('.formToggler').on('click', function () {
            leForm.slideToggle();
            setFormHeight();
            $(this).toggleClass('on');
        });

        $(window).on('resize', function()
        {
            setFormHeight();
        });

        leForm.on('submit', function(event)
        {
            if ( ! $.trim(leForm.find('textarea').val()))
            {
                event.preventDefault();
                leForm.addClass('alerted');
            }
        });

        if (code.length)
        {
            var link = $('li.link a'), lang = $('li.lang select');

            lang.on('change', function()
            {
                location.hash = lang.val();
                location.reload();
            });

            if (hash = location.hash.substring(1))
            {
                link.attr('href', link.data('base-href') + '#' + hash);
                lang.find('option[value="' + hash + '"]').prop('selected', true);
                code.attr('data-language', hash);
                Rainbow.color();
            }
        }

        setFormHeight();
        initPlaceHolders();
    });
})(jQuery);
