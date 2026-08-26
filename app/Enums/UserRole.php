<?php

namespace App\Enums;

enum UserRole: string
{
    case OWNER = 'owner';
    case ADMIN = 'administrator';
    case MEMBER = 'member';
}
