<?

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IpLog extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'ip'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
