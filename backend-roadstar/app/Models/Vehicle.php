<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'model',
        'year',
        'license_plate',
        'color',
        'mileage',
        'fuel_type',
        'transmission',
        'seats',
        'daily_rate',
        'status',
        'is_featured',
        'image',
        'description',
        'features',
        'category',
    ];

    protected $casts = [
        'year' => 'integer',
        'mileage' => 'integer',
        'seats' => 'integer',
        'daily_rate' => 'decimal:2',
        'is_featured' => 'boolean',
        'features' => 'array', // JSON cast
    ];

    protected $appends = ['name', 'price', 'passengers', 'fuel', 'featured', 'available', 'type'];

    public function getNameAttribute()
    {
        return trim($this->brand . ' ' . $this->model);
    }

    public function getPriceAttribute()
    {
        return number_format($this->daily_rate, 0, '.', ' ') . ' FCFA';
    }

    public function getPassengersAttribute()
    {
        return $this->seats;
    }

    public function getFuelAttribute()
    {
        return $this->fuel_type;
    }

    public function getFeaturedAttribute()
    {
        return $this->is_featured;
    }

    public function getAvailableAttribute()
    {
        return $this->status === 'available';
    }

    public function getTypeAttribute()
    {
        return $this->category ?? 'Véhicule';
    }
}
