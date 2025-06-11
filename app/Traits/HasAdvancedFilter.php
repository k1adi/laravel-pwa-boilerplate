<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasAdvancedFilter
{
    public function scopeAdvancedFilter(Builder $query)
    {
        $filterable = $this->filterable ?? []; // Columns allowed for filtering
        $searchValue = request('search'); // Search value from the query parameter

        if (!empty($searchValue)) {
            $query->where(function ($query) use ($filterable, $searchValue) {
                foreach ($filterable as $column) {
                    if (strpos($column, '.') !== false) {
                        // Handle relationships, e.g., "relation.column"
                        $segments = explode('.', $column);
                        $relation = array_shift($segments);
                        $field = implode('.', $segments);

                        $query->orWhereHas($relation, function ($q) use ($field, $searchValue) {
                            $q->where($field, 'like', "%{$searchValue}%");
                        });
                    } else {
                        // Handle direct fields
                        $query->orWhere($column, 'like', "%{$searchValue}%");
                    }
                }
            });
        }

        return $query;
    }
}
