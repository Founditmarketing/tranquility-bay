export const resortContent = {
    // CONFIGURATION: Set your external rental link here
    bookingUrl: "https://v2.reservationkey.com/tranquilitybayresort/reserve/c",

    header: {
        brandName: "Tranquility Bay",
        navLinks: [
            { label: "Home", href: "/" },
            {
                label: "Cabins",
                href: "#cabins",
                subLinks: [
                    { label: "Take A Look", href: "/cabins/gallery" },
                    { label: "View All", href: "https://v2.reservationkey.com/tranquilitybayresort/reserve", external: true },
                    { label: "Reserve Now", href: "https://v2.reservationkey.com/tranquilitybayresort/reserve/c", external: true },
                ]
            },
            {
                label: "Mobile Homes",
                href: "/#mobile-homes",
                subLinks: [
                    { label: "Take A Look", href: "/mobile-homes/gallery" },
                    { label: "View All", href: "https://v2.reservationkey.com/tranquilitybayresort/112929", external: true },
                    { label: "Reserve Now", href: "https://v2.reservationkey.com/tranquilitybayresort/112929/c", external: true },
                ]
            },
            {
                label: "RV Spots",
                href: "/#rv-spots",
                subLinks: [
                    { label: "View All", href: "https://v2.reservationkey.com/tranquilitybayresort/112928", external: true },
                    { label: "Reserve Now", href: "https://v2.reservationkey.com/tranquilitybayresort/112928/c", external: true },
                ]
            },
            {
                label: "Rentals",
                href: "/#rentals",
                subLinks: [
                    { label: "Golf Carts", href: "https://v2.reservationkey.com/tranquilitybayresort/112974", external: true },
                ]
            },
            { label: "Map", href: "/map" },
            { label: "About", href: "/#about" },
            { label: "Contact", href: "/#contact" },
        ],
        bookButtonText: "Book Now",
    },
    hero: {
        location: "Zwolle, Louisiana",
        title: "Tranquility Bay",
        tagline: "Sanctuary on the shores of Toledo Bend.",
        backgroundImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
        searchLabels: {
            dates: "Occasion",
            guests: "Guests",
            lodging: "Lodging",
            button: "CHECK AVAILABILITY"
        }
    },
    accommodations: {
        sectionTitle: "Choose Your",
        sectionSubtitle: "Stay",
        description: "From quality cabins to premium RV spots.",
        descriptionDesktop: "From quality cabins to spacious RV spots, find your perfect space and experience the ultimate sanctuary on the shores of Toledo Bend reservoir.",
        items: [
            {
                id: 1,
                title: "The Lakefront Cabins",
                category: "Quality Lodging",
                description: "Experience rustic elegance with full amenities and private decks overlooking the water.",
                image: "/tbaycabins.jpg",
                bookingUrl: "https://v2.reservationkey.com/tranquilitybayresort/reserve/c"
            },
            {
                id: 2,
                title: "Premium RV Sites",
                category: "Full Hookup",
                description: "Concrete pads with 50-amp service, nestled between towering pines and the shoreline.",
                image: "/tbayrvspotspic.png",
                bookingUrl: "https://v2.reservationkey.com/tranquilitybayresort/112928/c"
            },
            {
                id: 3,
                title: "Quality Mobile Homes",
                category: "Modern Stay",
                description: "A retro-modern approach to lakeside living with all the comforts of home.",
                image: "/tbaymobilehome.jpg",
                bookingUrl: "https://v2.reservationkey.com/tranquilitybayresort/112929/c"
            },
        ]
    },
    amenities: {
        sectionLabel: "Resort Features",
        titlePrefix: "Beyond the",
        titleItalic: "Cabin",
        items: [
            {
                title: "Golf Cart Rentals",
                description: "Explore the resort grounds in comfort with our fleet of modern electric carts.",
                image: "/tbaygolfcartrental.jpg",
                span: "md:col-span-2 md:row-span-2",
            },
            {
                title: "The Pavilion",
                description: "Our expansive community pavilion, perfect for gatherings with stunning lake views.",
                image: "/tbaypavillionpic.jpg",
                span: "md:col-span-1 md:row-span-1",
            },
            {
                title: "Waterfront Access",
                description: "Private access to the pristine shores of Toledo Bend for fishing and relaxation.",
                image: "/tbaypavilionandwater.jpg",
                span: "md:col-span-1 md:row-span-1",
            },
            {
                title: "Fishing Area",
                description: "Designated safe areas for world-class fishing with lake views and easy access.",
                image: "/tbaywaterpic1.jpg",
                span: "md:col-span-2 md:row-span-1",
            },
            {
                title: "Swimming Pool",
                description: "Cool off in our beautiful resort pool area with comfortable lounging.",
                image: "/tbayswimmingpool.jpg",
                span: "md:col-span-1 md:row-span-1",
            }
        ]
    },
    footer: {
        brandName: "Tranquility Bay",
        brandDescription: "A peaceful getaway on the shores of Toledo Bend. Experience quality lodging and great amenities in Zwolle, Louisiana.",
        contact: {
            address: "123 Tranquility Lane, Zwolle, LA 71486",
            phone: "(555) 123-4567",
            email: "stay@tranquilitybayla.com"
        },
        newsletter: {
            title: "The Ledger",
            description: "Subscribe for exclusive offers and updates from the bay.",
            buttonText: "Subscribe"
        }
    }
};
