const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface LeadInput {
  name: string;
  email: string;
  business_name: string;
  business_type: string;
  notes?: string;
}

/**
 * Envia los datos de registro (lead) a la tabla public.leads de Supabase.
 */
export const submitLead = async (lead: LeadInput): Promise<{ success: boolean; error?: string }> => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { success: false, error: 'Credenciales de Supabase no configuradas.' };
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        business_name: lead.business_name,
        business_type: lead.business_type,
        notes: lead.notes || ''
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedError;
      try {
        parsedError = JSON.parse(errText);
      } catch {
        parsedError = null;
      }
      
      const errMsg = parsedError?.message || errText || 'Error de servidor en Supabase';
      throw new Error(errMsg);
    }

    return { success: true };
  } catch (error: unknown) {
    console.error('Error al enviar el lead a Supabase:', error);
    const err = error instanceof Error ? error : new Error(String(error));
    return { success: false, error: err.message || 'Error de red o conexión' };
  }
};

export interface CompanyData {
  idEmpresa: string;
  NombreEmpresa: string;
  PropietarioEmpresaNombre?: string;
  mailEmpresa?: string;
  urlEmpresaUnico: string;
  logoEmpresa?: string;
  foto_empresa?: string;
  TelefonosEmpresa?: string[];
  DescripcionEmpresa?: string;
  DireccionEmpresa?: string;
}

export interface BranchData {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: "active" | "inactive";
  idEmpresa: string;
  telefonos: string[];
  fotos: string[];
  disponibilidad: boolean;
  tarifas: any[];
  lat: number | null;
  lng: number | null;
  LinkGoogleMaps?: string;
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  idEmpresa: string;
  idSucursales: string[];
  fotos: string[];
}

/**
 * Obtiene una empresa en base a su urlEmpresaUnico
 */
export const getCompanyBySlug = async (slug: string): Promise<CompanyData | null> => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase config is missing.');
    return null;
  }

  try {
    const url = `${supabaseUrl}/rest/v1/Empresa?urlEmpresaUnico=eq.${encodeURIComponent(slug.trim().toLowerCase())}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.length > 0) {
      const row = data[0];
      let telefonos: string[] = [];
      if (row.TelefonosEmpresa) {
        try {
          telefonos = typeof row.TelefonosEmpresa === 'string' 
            ? JSON.parse(row.TelefonosEmpresa) 
            : row.TelefonosEmpresa;
        } catch {
          telefonos = [row.TelefonosEmpresa];
        }
      }

      return {
        idEmpresa: row.idEmpresa,
        NombreEmpresa: row.NombreEmpresa,
        PropietarioEmpresaNombre: row.PropietarioEmpresaNombre,
        mailEmpresa: row.mailEmpresa,
        urlEmpresaUnico: row.urlEmpresaUnico,
        logoEmpresa: row.logoEmpresa || row.foto_empresa,
        TelefonosEmpresa: Array.isArray(telefonos) ? telefonos : [],
        DescripcionEmpresa: row.DescripcionEmpresa,
        DireccionEmpresa: row.DireccionEmpresa
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching company by slug:', error);
    return null;
  }
};

/**
 * Obtiene las sucursales de una empresa por su idEmpresa
 */
export const getBranchesByCompany = async (idEmpresa: string): Promise<BranchData[]> => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const url = `${supabaseUrl}/rest/v1/Sucursales?IDEmpresa=eq.${encodeURIComponent(idEmpresa)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data)) {
      return data.map((row: any) => {
        let telefonos: string[] = [];
        if (row.Telefonos) {
          try {
            telefonos = typeof row.Telefonos === 'string' ? JSON.parse(row.Telefonos) : row.Telefonos;
          } catch {
            telefonos = [row.Telefonos];
          }
        }

        let fotos: string[] = [];
        const rawFotos = row.FotosSucursal || row.FotosSucursales;
        if (rawFotos) {
          try {
            fotos = typeof rawFotos === 'string' ? JSON.parse(rawFotos) : rawFotos;
          } catch {
            // Fallback
          }
        }

        const disponibilidad = row.Disponibilidad !== undefined ? row.Disponibilidad : 
                               row.DisponibleSucursal !== undefined ? row.DisponibleSucursal : true;

        let tarifas: any[] = [];
        if (row.Tarifas) {
          try {
            tarifas = typeof row.Tarifas === 'string' ? JSON.parse(row.Tarifas) : row.Tarifas;
          } catch {
            // Fallback
          }
        }

        return {
          id: row.IDSucursal || row.id,
          name: row.NombreSucursal || row.name,
          address: row.DireccionSucursal || row.address,
          phone: telefonos[0] || '',
          status: disponibilidad ? 'active' : 'inactive',
          idEmpresa: row.IDEmpresa || row.idEmpresa,
          telefonos: Array.isArray(telefonos) ? telefonos : [],
          fotos: Array.isArray(fotos) ? fotos : [],
          disponibilidad: !!disponibilidad,
          tarifas: Array.isArray(tarifas) ? tarifas : [],
          lat: row.Latitud || row.lat || null,
          lng: row.Longitud || row.lng || null,
          LinkGoogleMaps: row.LinkGoogleMaps
        };
      });
    }
    return [];
  } catch (error) {
    console.error('Error fetching branches by company:', error);
    return [];
  }
};

/**
 * Obtiene los productos de una empresa por su idEmpresa
 */
export const getProductsByCompany = async (idEmpresa: string): Promise<ProductData[]> => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  try {
    const url = `${supabaseUrl}/rest/v1/products?idEmpresa=eq.${encodeURIComponent(idEmpresa)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data)) {
      return data.map((row: any) => {
        let idSucursales: string[] = [];
        if (row.IDSucursal) {
          try {
            idSucursales = typeof row.IDSucursal === 'string' ? JSON.parse(row.IDSucursal) : row.IDSucursal;
          } catch {
            // Fallback
          }
        }

        let fotos: string[] = [];
        if (row.FotosProducto) {
          try {
            fotos = typeof row.FotosProducto === 'string' ? JSON.parse(row.FotosProducto) : row.FotosProducto;
          } catch {
            // Fallback
          }
        }

        return {
          id: row.id,
          name: row.name,
          description: row.description || '',
          price: Number(row.price || 0),
          category: row.category || 'Otros',
          idEmpresa: row.idEmpresa,
          idSucursales: Array.isArray(idSucursales) ? idSucursales : [],
          fotos: Array.isArray(fotos) ? fotos : []
        };
      });
    }
    return [];
  } catch (error) {
    console.error('Error fetching products by company:', error);
    return [];
  }
};

export interface OrderInput {
  cliente_nombre: string;
  direccion: string;
  telefono: string;
  total: number;
  id_empresa: string;
  id_sucursal: string;
  productos: { id: string; name: string; price: number; quantity: number }[];
  lat: number;
  lng: number;
}

/**
 * Registra un nuevo pedido en la tabla ordenes de Supabase.
 */
export const createOrder = async (order: OrderInput): Promise<{ success: boolean; data?: any; error?: string }> => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { success: false, error: 'Credenciales de Supabase no configuradas.' };
  }

  // Generar ID único incremental: ord-{timestamp}
  const orderId = `ord-${Date.now()}`;

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/ordenes`, {
      method: 'POST',
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        id: orderId,
        cliente_nombre: order.cliente_nombre,
        direccion: order.direccion,
        telefono: order.telefono,
        total: order.total,
        estado: 'creada',
        id_empresa: order.id_empresa,
        id_sucursal: order.id_sucursal,
        productos: order.productos,
        tipo_entrega: 'a_domicilio',
        lat: order.lat,
        lng: order.lng
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedError;
      try {
        parsedError = JSON.parse(errText);
      } catch {
        parsedError = null;
      }
      
      const errMsg = parsedError?.message || errText || 'Error de servidor en Supabase';
      throw new Error(errMsg);
    }

    const data = await response.json();
    return { success: true, data: data[0] || { id: orderId } };
  } catch (error: unknown) {
    console.error('Error al crear la orden en Supabase:', error);
    const err = error instanceof Error ? error : new Error(String(error));
    return { success: false, error: err.message || 'Error de red o conexión' };
  }
};


