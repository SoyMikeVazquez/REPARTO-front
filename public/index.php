<?php
// ==========================================
// REPARTO.MX - INTERCEPTOR DE METADATOS PHP
// ==========================================

$supabaseUrl = 'https://yrblfqkiyiartazyotkt.supabase.co';
$supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYmxmcWtpeWlhcnRhenlvdGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNDc3NzIsImV4cCI6MjA5NTcyMzc3Mn0._SI6znYbNXfRHH7o0qYRSPlirZFV1p2LU9EHjMMKgnw';

$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');

$html_path = __DIR__ . '/index.html';
if (!file_exists($html_path)) {
    die("Error: No se encontró index.html");
}
$html = file_get_contents($html_path);

if ($path === '' || preg_match('/\.(js|css|png|jpg|jpeg|svg|ico|json|txt)$/i', $path)) {
    echo $html;
    exit;
}

function fetchSupabase($url, $key) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'apikey: ' . $key,
        'Authorization: Bearer ' . $key,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
    $result = curl_exec($ch);
    curl_close($ch);
    return json_decode($result, true);
}

$empresa_url = $supabaseUrl . '/rest/v1/Empresa?urlEmpresaUnico=eq.' . urlencode($path) . '&select=idEmpresa,NombreEmpresa,logoEmpresa,DescripcionEmpresa';
$empresa_data = fetchSupabase($empresa_url, $supabaseKey);

if ($empresa_data && is_array($empresa_data) && count($empresa_data) > 0) {
    $empresa = $empresa_data[0];
    $id_empresa = $empresa['idEmpresa'];
    
    $pers_url = $supabaseUrl . '/rest/v1/personalizacion_web?ID_Empresa=eq.' . urlencode($id_empresa) . '&select=meta_titulo,meta_descripcion,logo';
    $pers_data = fetchSupabase($pers_url, $supabaseKey);
    
    $newTitle = 'Reparto.mx | Software de Gestión y Optimización de Entregas';
    $newDesc = 'Optimiza tus entregas locales, planifica rutas eficientes y rastrea repartidores en tiempo real con Reparto.mx. La plataforma ideal para restaurantes, e-commerce y servicios de mensajería.';
    $newFavicon = !empty($empresa['logoEmpresa']) ? $empresa['logoEmpresa'] : '/favicon.png';
    
    if ($pers_data && is_array($pers_data) && count($pers_data) > 0) {
        $pers = $pers_data[0];
        if (!empty($pers['meta_titulo']) && $pers['meta_titulo'] !== 'EMPTY') {
            $newTitle = $pers['meta_titulo'];
        }
        if (!empty($pers['meta_descripcion']) && $pers['meta_descripcion'] !== 'EMPTY') {
            $newDesc = $pers['meta_descripcion'];
        }
        if (!empty($pers['logo']) && $pers['logo'] !== 'EMPTY') {
            $newFavicon = $pers['logo'];
        }
    }
    
    $newTitle = htmlspecialchars($newTitle, ENT_QUOTES, 'UTF-8');
    $newDesc = htmlspecialchars($newDesc, ENT_QUOTES, 'UTF-8');
    $newFaviconEscaped = htmlspecialchars($newFavicon, ENT_QUOTES, 'UTF-8');
    
    $html = preg_replace('/<title>.*?<\/title>/is', '<title>' . $newTitle . '</title>', $html);
    $html = preg_replace('/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/is', '<meta name="description" content="' . $newDesc . '" />', $html);
    $html = preg_replace('/<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/is', '<meta property="twitter:title" content="' . $newTitle . '" />', $html);
    $html = preg_replace('/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/is', '<meta property="twitter:description" content="' . $newDesc . '" />', $html);
    $html = preg_replace('/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/is', '<meta property="og:title" content="' . $newTitle . '" />', $html);
    $html = preg_replace('/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/is', '<meta property="og:description" content="' . $newDesc . '" />', $html);
    
    if (filter_var($newFavicon, FILTER_VALIDATE_URL)) {
        $html = preg_replace('/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/is', '<meta property="og:image" content="' . $newFaviconEscaped . '" />', $html);
        $html = preg_replace('/<meta\s+property="twitter:image"\s+content="[^"]*"\s*\/?>/is', '<meta property="twitter:image" content="' . $newFaviconEscaped . '" />', $html);
    }
    
    $html = preg_replace('/<link\s+rel="icon"\s+type="image\/[^"]+"\s+href="[^"]+"\s*\/?>/is', '<link rel="icon" type="image/png" href="' . $newFaviconEscaped . '" />', $html);
}

echo $html;
?>

