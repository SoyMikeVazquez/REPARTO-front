const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
const resendFromEmail = import.meta.env.VITE_RESEND_FROM_EMAIL;

export interface LeadEmailInput {
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  notes?: string;
}

/**
 * Envía una notificación por correo electrónico usando la API de Resend.
 * Nota: Puede verse bloqueado por CORS en el navegador si Resend no lo permite.
 */
export const sendLeadEmail = async (
  lead: LeadEmailInput
): Promise<{ success: boolean; error?: string; isCorsError?: boolean }> => {
  if (!resendApiKey || !resendFromEmail) {
    return {
      success: false,
      error: 'Credenciales de Resend no configuradas en las variables de entorno (.env).',
    };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Reparto.mx Leads <${resendFromEmail}>`,
        to: ['vidalcavazos@gmail.com', 'soymikevazquez@gmail.com'], // Notificar al administrador
        subject: `Nuevo Lead: ${lead.businessName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; color: #1a202c;">
            <h2 style="color: #E53E3E; margin-top: 0; border-bottom: 2px solid #E53E3E; padding-bottom: 10px;">¡Nuevo Lead Registrado!</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #4a5568;">Se ha recibido una nueva solicitud a través de la landing page de <strong>reparto.mx</strong>:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 150px; border-bottom: 1px solid #edf2f7;">Nombre:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;">${lead.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #edf2f7;">Email del Lead:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;"><a href="mailto:${lead.email}" style="color: #E53E3E; text-decoration: none;">${lead.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #edf2f7;">Negocio:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7;">${lead.businessName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #edf2f7;">Tipo de Negocio:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; text-transform: capitalize;">${lead.businessType.replace('_', ' ')}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #edf2f7; vertical-align: top;">Notas:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #edf2f7; white-space: pre-line;">${lead.notes || 'Ninguna'}</td>
              </tr>
            </table>

            <p style="font-size: 12px; color: #a0aec0; margin-top: 30px; text-align: center; border-top: 1px solid #edf2f7; padding-top: 15px;">
              Este correo fue generado automáticamente por la Landing Page de Reparto.mx
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Error de servidor en Resend (${response.status})`);
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Error al enviar correo con Resend:', error);
    
    const err = error instanceof Error ? error : new Error(String(error));
    // Si falla el fetch por CORS o red, es probable que sea error de tipo TypeError: Failed to fetch
    const isCors = err instanceof TypeError || err.message?.toLowerCase().includes('fetch');
    
    return {
      success: false,
      error: err.message || 'Error de red o conexión al intentar llamar a Resend.',
      isCorsError: isCors
    };
  }
};

export interface OrderEmailInput {
  orderId: string;
  cliente_nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  total: number;
  productos: { id: string; name: string; price: number; quantity: number }[];
  companyName: string;
  branchName: string;
}

/**
 * Envía un correo electrónico de confirmación de pedido usando Resend.
 */
export const sendOrderEmail = async (
  input: OrderEmailInput
): Promise<{ success: boolean; error?: string; isCorsError?: boolean }> => {
  if (!resendApiKey || !resendFromEmail) {
    return {
      success: false,
      error: 'Credenciales de Resend no configuradas en las variables de entorno (.env).',
    };
  }

  try {
    const productsHtml = input.productos
      .map(
        (p) => `
        <tr style="border-bottom: 1px solid #edf2f7;">
          <td style="padding: 10px 0; font-size: 14px; color: #4a5568;">${p.name} x ${p.quantity}</td>
          <td style="padding: 10px 0; font-size: 14px; font-weight: bold; text-align: right; color: #1a202c;">
            $${(p.price * p.quantity).toFixed(2)}
          </td>
        </tr>
      `
      )
      .join('');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Reparto.mx Pedidos <${resendFromEmail}>`,
        to: [input.email],
        cc: ['vidalcavazos@gmail.com', 'soymikevazquez@gmail.com'],
        subject: `Confirmación de Pedido #${input.orderId} - ${input.companyName}`,
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; padding: 30px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; color: #1a202c; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="font-size: 28px; font-weight: 800; color: #E53E3E; letter-spacing: -0.5px;">reparto.mx</span>
            </div>
            
            <h2 style="color: #1a202c; font-size: 22px; font-weight: 700; margin-top: 0; text-align: center;">¡Gracias por tu compra!</h2>
            <p style="font-size: 15px; line-height: 1.6; color: #4a5568; text-align: center; margin-bottom: 24px;">
              Tu pedido ha sido recibido con éxito en la sucursal <strong>${input.branchName}</strong> de <strong>${input.companyName}</strong>.
            </p>
            
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #718096; margin-bottom: 12px;">Resumen del Pedido</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${productsHtml}
                <tr style="border-top: 2px solid #edf2f7;">
                  <td style="padding: 14px 0 0; font-size: 16px; font-weight: bold; color: #1a202c;">Total</td>
                  <td style="padding: 14px 0 0; font-size: 18px; font-weight: 800; text-align: right; color: #E53E3E;">
                    $${input.total.toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #718096; margin-bottom: 12px; border-bottom: 1px solid #edf2f7; padding-bottom: 6px;">Detalles de Entrega</h3>
              <table style="width: 100%; font-size: 14px; line-height: 1.5;">
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #4a5568; width: 120px;">Pedido ID:</td>
                  <td style="padding: 4px 0; color: #1a202c;">${input.orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #4a5568;">Cliente:</td>
                  <td style="padding: 4px 0; color: #1a202c;">${input.cliente_nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #4a5568;">Teléfono:</td>
                  <td style="padding: 4px 0; color: #1a202c;">${input.telefono}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-weight: bold; color: #4a5568; vertical-align: top;">Dirección:</td>
                  <td style="padding: 4px 0; color: #1a202c;">${input.direccion}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; border-top: 1px solid #edf2f7; padding-top: 20px; margin-top: 30px;">
              <p style="font-size: 12px; color: #a0aec0; margin: 0;">
                Este correo fue enviado por ${input.companyName} usando la tecnología de reparto.mx
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Error de servidor en Resend (${response.status})`);
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Error al enviar correo de la orden con Resend:', error);
    const err = error instanceof Error ? error : new Error(String(error));
    const isCors = err instanceof TypeError || err.message?.toLowerCase().includes('fetch');
    return {
      success: false,
      error: err.message || 'Error de red o conexión al intentar llamar a Resend.',
      isCorsError: isCors
    };
  }
};

