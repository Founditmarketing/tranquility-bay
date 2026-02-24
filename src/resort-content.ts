export const resortContent = {
    // CONFIGURATION: Set your external rental link here
    bookingUrl: "https://your-rental-platform.com",

    header: {
        brandName: "Tranquility Bay",
        navLinks: [
            { label: "Stay", href: "#stay" },
            { label: "Experiences", href: "#experiences" },
            { label: "About", href: "#about" },
        ],
        bookButtonText: "Book Now",
    },
    hero: {
        location: "Zwolle, Louisiana",
        title: "Tranquility Bay",
        tagline: "Sanctuary on the shores of Toledo Bend.",
        backgroundImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
        searchLabels: {
            dates: "Check In - Out",
            guests: "Guests",
            lodging: "Lodging",
            button: "CHECK AVAILABILITY"
        }
    },
    accommodations: {
        sectionTitle: "Curated",
        sectionSubtitle: "Accommodations",
        description: "From luxury cabins to premier RV sites, find your perfect space.",
        items: [
            {
                id: 1,
                title: "The Lakefront Cabins",
                category: "Luxury Lodging",
                description: "Experience rustic elegance with full amenities and private decks overlooking the water.",
                image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1974&auto=format&fit=crop",
            },
            {
                id: 2,
                title: "Premium RV Sites",
                category: "Full Hookup",
                description: "Concrete pads with 50-amp service, nestled between towering pines and the shoreline.",
                image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop",
            },
            {
                id: 3,
                title: "Glamping Mobile Suites",
                category: "Modern Stay",
                description: "A retro-modern approach to camping with all the comforts of a hotel suite.",
                image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
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
                image: "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?q=80&w=1933&auto=format&fit=crop",
                span: "md:col-span-2 md:row-span-2",
            },
            {
                title: "The Camp Store",
                description: "Stocked with premium provisions, local goods, and essential gear.",
                image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1974&auto=format&fit=crop",
                span: "md:col-span-1 md:row-span-1",
            },
            {
                title: "Lakeside Firepits",
                description: "Gather under the stars with complimentary firewood delivered to your site.",
                image: "https://images.unsplash.com/photo-1525258946800-98ffdd87d17f?q=80&w=1996&auto=format&fit=crop",
                span: "md:col-span-1 md:row-span-1",
            },
            {
                title: "Swimming Area",
                description: "Designated safe swimming area with lake views and crystal clear water access.",
                image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop",
                span: "md:col-span-2 md:row-span-1",
            }
        ]
    },
    footer: {
        brandName: "Tranquility Bay",
        brandDescription: "A bespoke sanctuary on the shores of Toledo Bend. Experience luxury lodging and premier amenities in Zwolle, Louisiana.",
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
