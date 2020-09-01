<?php

namespace Aldhix\Altarinflex;

use Illuminate\Support\ServiceProvider as Service;
use Illuminate\Support\Facades\Blade;


class ServiceProvider extends Service
{
    /**
     * Register services.
     *
     * @return void
     */


    public function register()
    {
       //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {  
        $this->loadViewsFrom(__DIR__.'/views/components', 'component');
        Blade::component('component::inflex','alt-inflex');
    }
}