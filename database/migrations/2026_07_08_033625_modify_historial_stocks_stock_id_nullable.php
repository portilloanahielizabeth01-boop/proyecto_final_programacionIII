<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::table('historial_stocks', function (Blueprint $table) {
        // Hacemos que stock_id sea anulable
        $table->foreignId('stock_id')->nullable()->change();
    });
}

public function down(): void
{
    Schema::table('historial_stocks', function (Blueprint $table) {
        $table->foreignId('stock_id')->nullable(false)->change();
    });
}
};
