<?php
declare(strict_types=1);

header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function form_value(string $key): string
{
    $value = $_POST[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function form_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function reply(int $status, string $result, string $locale, array $errors = []): void
{
    if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
        http_response_code($status);
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['result' => $result, 'errors' => $errors]);
        exit;
    }

    $prefix = $locale === 'hi' ? '/hi' : '';
    header('Location: ' . $prefix . '/appointment-' . $result, true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    exit;
}

$locale = form_value('locale') === 'hi' ? 'hi' : 'en';
$from = getenv('ANVITHA_APPOINTMENT_FROM') ?: '';
$enabled = getenv('ANVITHA_APPOINTMENTS_ENABLED') === 'true';
$privacyApproved = getenv('ANVITHA_APPOINTMENT_PRIVACY_APPROVED') === 'true';
$retentionPolicy = getenv('ANVITHA_APPOINTMENT_RETENTION_POLICY') === 'purpose';

// Collection stays off until the owner approves the privacy copy and retention policy.
if (!$enabled || !$privacyApproved || !$retentionPolicy || !filter_var($from, FILTER_VALIDATE_EMAIL)
    || !preg_match('/@anvithalegal\.com$/i', $from)) {
    reply(503, 'unavailable', $locale);
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000 || !empty($_FILES)) {
    reply(422, 'invalid', $locale);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://anvithalegal.com', 'https://www.anvithalegal.com'], true)) {
    reply(403, 'invalid', $locale);
}

// A hidden field catches simple automated submissions without storing the visitor's IP.
if (form_value('website') !== '') {
    reply(422, 'invalid', $locale);
}

$name = form_value('name');
$rawPhone = form_value('phone');
$email = form_value('email');
$subject = form_value('subject');
$query = form_value('query');
$errors = [];

if ($name === '' || form_length($name) > 100 || preg_match('/[\x00-\x1F\x7F]/', $name)) {
    $errors['name'] = 'invalid';
}

$phone = preg_replace('/[\s().-]+/', '', $rawPhone) ?? '';
if (str_starts_with($phone, '+91')) {
    $phone = substr($phone, 3);
} elseif (str_starts_with($phone, '91') && strlen($phone) === 12) {
    $phone = substr($phone, 2);
}
if (strlen($rawPhone) > 20 || !preg_match('/^[6-9][0-9]{9}$/D', $phone)) {
    $errors['phone'] = 'invalid';
}

if ($email !== '' && (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL))) {
    $errors['email'] = 'invalid';
}
if (form_length($subject) > 120 || preg_match('/[\x00-\x1F\x7F]/', $subject)) {
    $errors['subject'] = 'invalid';
}
if ($query === '' || form_length($query) > 3000) {
    $errors['query'] = 'invalid';
}
if ($errors !== []) {
    reply(422, 'invalid', $locale, $errors);
}

$source = form_value('source');
if (!preg_match('#^/[a-z0-9/-]{0,140}$#', $source)) {
    $source = '/';
}

$body = implode("\n", [
    'New appointment request — Anvitha Legal',
    '',
    'Name: ' . $name,
    'Mobile: +91' . $phone,
    'Email: ' . ($email !== '' ? $email : 'Not provided'),
    'Subject: ' . ($subject !== '' ? $subject : 'Not provided'),
    'Page: ' . $source,
    'Language: ' . ($locale === 'hi' ? 'Hindi' : 'English'),
    'Submitted at: ' . gmdate('c'),
    '',
    'Query:',
    $query,
]);

$headers = [
    'From' => 'Anvitha Legal <' . $from . '>',
    'Content-Type' => 'text/plain; charset=UTF-8',
];
if ($email !== '') {
    $headers['Reply-To'] = $email;
}

$sent = @mail(
    'anvithalegal@gmail.com',
    'New appointment request | Anvitha Legal',
    $body,
    $headers
);

reply($sent ? 200 : 503, $sent ? 'sent' : 'unavailable', $locale);
