// ./components/DataInitializer.tsx

// Bu dosyayı ya tamamen silin ya da aşağıdaki gibi sadece basit bir bileşen haline getirin.
// Veya bu dosya app/shop/page.tsx içindeki veriyi global state'e taşıyorsa, 
// o state yönetimini uygulamanız gerekir. 

// Eğer bu dosyayı silebilirseniz en kolayıdır.

// Eğer silmek yerine düzeltmek istiyorsanız ve bu dosya global state yönetimi için 
// gerekiyorsa, içeriği aşağıdaki gibi (veya kendi ihtiyacınıza göre) boşaltın:

import React from 'react';

const DataInitializer: React.FC = () => {
    // Eğer bu bileşenin görevi sadece Next.js'in client tarafında 
    // çalışmasını sağlamaksa veya başka bir işlevi yoksa boş bırakılabilir.

    // Eğer bu dosya, API'dan çekilen veriyi (categories, products) 
    // global bir state yönetimi (örneğin Zustand/Redux) içine yüklemek için 
    // oluşturulduysa, o global state yönetimini kurmanız ve buraya doğru kodu yazmanız gerekir.

    return null;
};

export default DataInitializer;