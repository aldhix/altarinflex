<?php

namespace Aldhix\Altarinflex;
use Route;

class Inflexdemo
{
 
   public static function routes()
   {
       Route::group([
            'prefix' => 'demo',
        ], function() {
            Route::get('/inflex','InflexdemoController@index')->name('demo.inflex');
            Route::post('/inflex','InflexdemoController@upload');
            Route::delete('/inflex','InflexdemoController@destroy');
        });
   }
}
