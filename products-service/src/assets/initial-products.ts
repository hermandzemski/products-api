import { Product } from "@models/product";

export const initialProducts: Omit<Product, 'id'>[] = [
    {
        title: 'Apple IPhone 11',
        price: 1200,
        description: `6.1-inch Liquid Retina HD LCD display
        Water and dust resistant (2 meters for up to 30 minutes, IP68)
        Dual-camera system with 12MP Ultra Wide and Wide cameras; Night mode, Portrait mode, and 4K video up to 60fps
        12MP TrueDepth front camera with Portrait mode, 4K video, and Slo-Mo
        Face ID for secure authentication and Apple Pay
        A13 Bionic chip with third-generation Neural Engine
        Fast-charge capable
        Wireless charging`,
        count: 10
    }, 
    {
        title: 'Apple IPhone 12',
        price: 1300,
        description: `Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce lacinia metus at nisi ultricies ornare. Maecenas semper, nisl in vestibulum ultricies, risus purus vulputate elit, nec bibendum lorem lacus eu nunc. Fusce orci nisl, lacinia eget lacus vel, aliquam laoreet diam. Sed in lacinia purus. Fusce ut nisi eu enim molestie auctor sit amet nec tellus. Sed fringilla augue eu ultrices euismod.`,
        count: 12
    }, 
    {
        title: 'Apple IPhone 13',
        price: 1400,
        description: `Etiam sapien sapien, tristique quis risus et, lacinia eleifend justo. Maecenas convallis ante odio, vitae ultricies mauris vehicula id. Fusce accumsan magna id erat suscipit, vitae aliquet ipsum rutrum. Integer quis lacinia justo. Mauris eu dui tellus. Phasellus et semper quam, eu posuere libero. Pellentesque laoreet nunc libero, eget pellentesque sem laoreet sit amet. Etiam id sapien vestibulum, ultricies ante eleifend, imperdiet purus. Sed interdum ultricies ante, blandit ullamcorper nisi dictum non. Pellentesque luctus fermentum lectus. Pellentesque rutrum neque enim, vitae fermentum mi lacinia non. Praesent rutrum porta nisl, id feugiat enim suscipit at. Mauris a justo id nisl semper semper. Praesent in blandit lacus. Donec cursus quis nibh sed dapibus.`,
        count: 15
    },
    {
        title: 'Apple IPhone 14',
        price: 1700,
        description: `We encourage you to re‑use your current USB‑A to Lightning cables, power adapters, and headphones, which are compatible with these iPhone models. But if you need any new Apple power adapters or headphones, they are available for purchase.`,
        count: 22
    }
];