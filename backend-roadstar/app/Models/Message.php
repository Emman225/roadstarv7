<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'vehicle_id',
        'start_date',
        'end_date',
        'pickup_location',
        'is_read',
    ];

    protected $casts = [
        'vehicle_id' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_read' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = ['nom', 'telephone', 'sujet', 'status'];

    public function getNomAttribute()
    {
        return $this->name;
    }

    public function getTelephoneAttribute()
    {
        return $this->phone;
    }

    public function getSujetAttribute()
    {
        return $this->subject;
    }

    public function getStatusAttribute()
    {
        return $this->is_read ? 'read' : 'unread';
    }

    // Relation avec Vehicle
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    // Scopes for easy filtering
    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    public function scopeRead($query)
    {
        return $query->where('is_read', true);
    }

    public function scopeContact($query)
    {
        return $query->where('type', 'contact');
    }

    public function scopeReservation($query)
    {
        return $query->where('type', 'reservation');
    }
}
