<?php
/**
 * This function calculates next month in the calendar 
 */
function _next_month(&$month, &$year)
{ 
  if ($month == 12) { $year++; $month=1; } else { $month++; }
}

/**
 * This function calculates previous month in the calendar 
 */
function _previous_month(&$month, &$year)
{ 
  if ($month == 1) { $year--; $month=12; } else { $month--; }
}

/**
 * This function calculates the first day of the current year for a given $date
 */
function _first_day_year($date)
{
  $year = date('Y', $date);
  return mktime(0,0,0,1, 1, $year);
}

/**
 * This function calculates the first day of the current year for a given $date
 */
function _first_day_next_year($date)
{
  $year = date('Y', $date);
  $year++;
  return mktime(0,0,0,1, 1, $year);
}

/**
 * This function calculates the first day of the current month for a given $date
 */
function _first_day_month($date)
{
  $month = date('m', $date);
  $year = date('Y', $date);
  return mktime(0,0,0,$month, 1, $year);
}

/**
 * This function calculates next months first day in unix timestamp
 */
function _first_day_next_month($date)
{
  $month = date('m', $date);
  $year = date('Y', $date);
  _next_month($month, $year);
  return mktime(0,0,0,$month, 1, $year);
} 

/**
 * This function calculates previous months first day in unix timestamp
 */
function _first_day_previous_month($date)
{
  $month = date('m', $date);
  $year = date('Y', $date);
  _previous_month($month, $year);
  return mktime(0,0,0,$month, 1, $year);
} 

/**
 * This function calculates previous months first day in unix timestamp
 */
function _first_day_previous_year($date)
{
  $year = date('Y', $date);
  $year--;
  return mktime(0,0,0,1, 1, $year);
} 

/**
 * This function calculates if the given date is weekend day
 */
function _is_weekend($date)
{
  $weekday = date('N', $date);
  if ($weekday > 5) { return TRUE; } else { return FALSE; }
} 

/**
 * This function calculates how many days has a given month
 */
function _days_in_month($month, $year)
{ 
  // calculate number of days in a month
  return $month == 2 ? ($year % 4 ? 28 : ($year % 100 ? 29 : ($year % 400 ? 28 : 29))) : (($month - 1) % 7 % 2 ? 30 : 31); 
} 

/**
 * This function calculates if the given date belongs to the current day
 */
function _is_today ($date) {

    $current_date = time();
    
    $day = date ('j', $date);
    $month = date('m', $date);
    $year = date('Y', $date);
	
    $init_time_day = mktime(0,0,0,$month, $day, $year);
	
    if (($init_time_day < $current_date) && (($init_time_day + 86400) > $current_date))
       $result = true;
    else
       $result = false;
	  
    return $result;
}

$meses_castellano = array(1 => "Enero", 2 => "Febrero", 3 => "Marzo", 4 => "Abril", 5 => "Mayo", 6 => "Junio", 7 => "Julio", 8 => "Agosto", 9 => "Septiembre", 10 => "Octubre", 11 => "Noviembre", 12 => "Diciembre");

?>
