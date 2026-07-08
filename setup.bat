@echo off
title Event Ticketing Angular Setup

echo ==========================================
echo EVENT TICKETING SYSTEM
echo Angular 20 Enterprise Setup
echo ==========================================
echo.

REM =====================================================
REM LAYOUTS
REM =====================================================

echo Creating Layouts...

call ng g c layouts/main-layout --standalone --skip-tests
call ng g c layouts/auth-layout --standalone --skip-tests
call ng g c layouts/header --standalone --skip-tests
call ng g c layouts/sidebar --standalone --skip-tests
call ng g c layouts/footer --standalone --skip-tests

REM =====================================================
REM SHARED COMPONENTS
REM =====================================================

echo Creating Shared Components...

call ng g c shared/components/loading-spinner --standalone --skip-tests
call ng g c shared/components/confirm-dialog --standalone --skip-tests
call ng g c shared/components/page-header --standalone --skip-tests
call ng g c shared/components/search-bar --standalone --skip-tests
call ng g c shared/components/empty-state --standalone --skip-tests
call ng g c shared/components/status-chip --standalone --skip-tests
call ng g c shared/components/not-found --standalone --skip-tests

REM =====================================================
REM AUTH FEATURE
REM =====================================================

echo Creating Auth Feature...

call ng g c features/auth/login --standalone --skip-tests
call ng g c features/auth/register-user --standalone --skip-tests
call ng g c features/auth/register-organizer --standalone --skip-tests

mkdir src\app\features\auth\models
mkdir src\app\features\auth\services

type nul > src\app\features\auth\auth.routes.ts
type nul > src\app\features\auth\models\auth.model.ts

call ng g s features/auth/services/auth --skip-tests

REM =====================================================
REM PUBLIC FEATURE
REM =====================================================

echo Creating Public Feature...

call ng g c features/public/home --standalone --skip-tests
call ng g c features/public/event-list --standalone --skip-tests
call ng g c features/public/event-detail --standalone --skip-tests

mkdir src\app\features\public\models
mkdir src\app\features\public\services

type nul > src\app\features\public\public.routes.ts

call ng g s features/public/services/event --skip-tests

REM =====================================================
REM ORGANIZER FEATURE
REM =====================================================

echo Creating Organizer Feature...

call ng g c features/organizer/dashboard --standalone --skip-tests
call ng g c features/organizer/my-events --standalone --skip-tests
call ng g c features/organizer/create-event --standalone --skip-tests
call ng g c features/organizer/edit-event --standalone --skip-tests
call ng g c features/organizer/event-detail --standalone --skip-tests
call ng g c features/organizer/ticket-management --standalone --skip-tests
call ng g c features/organizer/attendee-management --standalone --skip-tests
call ng g c features/organizer/staff-management --standalone --skip-tests

mkdir src\app\features\organizer\models
mkdir src\app\features\organizer\services

type nul > src\app\features\organizer\organizer.routes.ts

call ng g s features/organizer/services/organizer --skip-tests

REM =====================================================
REM USER FEATURE
REM =====================================================

echo Creating User Feature...

call ng g c features/user/dashboard --standalone --skip-tests
call ng g c features/user/my-booking --standalone --skip-tests
call ng g c features/user/payment --standalone --skip-tests
call ng g c features/user/booking-history --standalone --skip-tests
call ng g c features/user/profile --standalone --skip-tests

mkdir src\app\features\user\models
mkdir src\app\features\user\services

type nul > src\app\features\user\user.routes.ts

call ng g s features/user/services/user --skip-tests

REM =====================================================
REM ADMIN FEATURE
REM =====================================================

echo Creating Admin Feature...

call ng g c features/admin/dashboard --standalone --skip-tests
call ng g c features/admin/waiting-approval --standalone --skip-tests
call ng g c features/admin/approve-event --standalone --skip-tests

mkdir src\app\features\admin\models
mkdir src\app\features\admin\services

type nul > src\app\features\admin\admin.routes.ts

call ng g s features/admin/services/admin --skip-tests

REM =====================================================
REM STAFF FEATURE
REM =====================================================

echo Creating Staff Feature...

call ng g c features/staff/checkin-scanner --standalone --skip-tests

mkdir src\app\features\staff\models
mkdir src\app\features\staff\services

type nul > src\app\features\staff\staff.routes.ts

call ng g s features/staff/services/staff --skip-tests

REM =====================================================
REM CORE
REM =====================================================

echo Creating Core...

mkdir src\app\core\authentication
mkdir src\app\core\constants
mkdir src\app\core\enums
mkdir src\app\core\models

call ng g s core/services/api --skip-tests
call ng g s core/services/loading --skip-tests
call ng g s core/services/dialog --skip-tests
call ng g s core/services/snackbar --skip-tests
call ng g s core/services/storage --skip-tests

call ng g guard core/guards/auth --skip-tests
call ng g guard core/guards/role --skip-tests
call ng g guard core/guards/guest --skip-tests

call ng g interceptor core/interceptors/auth --skip-tests
call ng g interceptor core/interceptors/error --skip-tests
call ng g interceptor core/interceptors/loading --skip-tests

REM =====================================================
REM SHARED
REM =====================================================

echo Creating Shared...

mkdir src\app\shared\validators
mkdir src\app\shared\interfaces
mkdir src\app\shared\utils

call ng g pipe shared/pipes/event-status --skip-tests
call ng g pipe shared/pipes/booking-status --skip-tests
call ng g pipe shared/pipes/role --skip-tests

call ng g directive shared/directives/role --skip-tests

type nul > src\app\shared\utils\jwt.util.ts
type nul > src\app\shared\utils\storage.util.ts
type nul > src\app\shared\utils\date.util.ts

REM =====================================================
REM ASSETS
REM =====================================================

echo Creating Assets...

mkdir src\assets\images
mkdir src\assets\icons
mkdir src\assets\fonts
mkdir src\assets\scss

REM =====================================================
REM ENVIRONMENT
REM =====================================================

if not exist src\environments mkdir src\environments

type nul > src\environments\environment.ts
type nul > src\environments\environment.development.ts

echo.
echo ==========================================
echo SETUP SUCCESSFULLY COMPLETED
echo ==========================================
pause