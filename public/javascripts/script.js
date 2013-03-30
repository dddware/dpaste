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

    function setFormHeight()
    {
        var height = $('#container').height() - ($('header').outerHeight() + $('footer').outerHeight());
        $('.leForm textarea').height(height);
    }

    $(function()
    {
        $('.formToggler').on('click', function () {
            $('.leForm').slideToggle();
            setFormHeight();
        });

        $(window).on('resize', function()
        {
            setFormHeight();
        });

        setFormHeight();
        initPlaceHolders();
    });
})(jQuery);