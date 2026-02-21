
export interface GuideSection {
  id: string;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  icon: string;
  category: 'basic' | 'setup' | 'technical' | 'extra';
  steps?: string[];
  stepsEn?: string[];
}

export const guideSections: GuideSection[] = [
  {
    id: 'intro',
    title: 'প্রয়োজনীয়তা (Requirements)',
    titleEn: 'Requirements',
    category: 'basic',
    icon: '📋',
    content: `গেমটি তৈরি করার জন্য আপনার পিসিতে নিচের জিনিসগুলো থাকা প্রয়োজন:
    - **Unity 2021.3** বা পরবর্তী ভার্সন।
    - **Android Build Support** (মোবাইলের জন্য বিল্ড করতে চাইলে)।
    - কমপক্ষে **3GB+ RAM** কম্পিউটার (স্মুথ কাজের জন্য ৮জিবি রিকমেন্ডেড)।`,
    contentEn: `To create this game, your PC needs the following:
    - **Unity 2021.3** or later version.
    - **Android Build Support** (if building for mobile).
    - At least **3GB+ RAM** (8GB recommended for smooth development).`
  },
  {
    id: 'setup',
    title: 'প্রজেক্ট সেটআপ',
    titleEn: 'Project Setup',
    category: 'setup',
    icon: '🛠️',
    content: `১. Unity Hub খুলুন এবং "New Project" ক্লিক করুন।
    ২. **3D (URP)** টেমপ্লেট সিলেক্ট করুন। URP লো-এন্ড মোবাইলের জন্য সেরা পারফরম্যান্স দেয়।
    ৩. প্রজেক্টের নাম দিন: "BattleRoyaleMobile"।
    ৪. স্ক্রিপ্ট ইমপোর্ট করার জন্য Assets ফোল্ডারে "Scripts" নামে একটি ফোল্ডার তৈরি করুন।`,
    contentEn: `1. Open Unity Hub and click "New Project".
    2. Select **3D (URP)** template. URP provides the best performance for low-end mobiles.
    3. Name the project: "BattleRoyaleMobile".
    4. Create a folder named "Scripts" inside the Assets folder for importing scripts.`
  },
  {
    id: 'scripts',
    title: 'প্রয়োজনীয় স্ক্রিপ্টসমূহ',
    titleEn: 'Essential Scripts',
    category: 'technical',
    icon: '💻',
    content: `আপনার গেমে নিচের স্ক্রিপ্টগুলো থাকা অত্যাবশ্যক:
    - **GameManager.cs**: গেমের লজিক এবং স্কোর হ্যান্ডেল করার জন্য।
    - **PlayerController.cs**: প্লেয়ার মুভমেন্ট ও শুটিং।
    - **BotAI.cs**: এনিমিদের অটোমেটিক মুভমেন্ট ও অ্যাটাক।
    - **Bullet.cs**: বুলেটের ট্র্যাজেক্টরি ও ড্যামেজ।
    - **WeaponPickup.cs**: গান লুটিং সিস্টেম।
    - **SafeZoneVisualizer.cs**: জোন শ্রিঙ্কিং মেকানিজম।`,
    contentEn: `The following scripts are essential for your game:
    - **GameManager.cs**: For handling game logic and scores.
    - **PlayerController.cs**: Player movement and shooting.
    - **BotAI.cs**: Automatic enemy movement and attacks.
    - **Bullet.cs**: Bullet trajectory and damage.
    - **WeaponPickup.cs**: Gun looting system.
    - **SafeZoneVisualizer.cs**: Zone shrinking mechanism.`,
    steps: [
      "Assets > Scripts ফোল্ডার তৈরি করুন",
      "সব স্ক্রিপ্ট ড্র্যাগ করে ড্রপ করুন",
      "স্ক্রিপ্টগুলো সঠিক অবজেক্টে অ্যাসাইন করুন"
    ],
    stepsEn: [
      "Create Assets > Scripts folder",
      "Drag and drop all scripts",
      "Assign scripts to the correct objects"
    ]
  },
  {
    id: 'scene',
    title: 'বেসিক সিন তৈরি (Terrain & Player)',
    titleEn: 'Basic Scene Creation',
    category: 'setup',
    icon: '🌍',
    content: `**Terrain/Ground তৈরি:**
    Hierarchy তে Plane নিন, স্কেল দিন (10, 1, 10)। একে Ground ট্যাগ দিন।
    
    **Player Setup:**
    একটি Capsule নিন এবং নাম দিন Player। এতে Rigidbody এবং আপনার PlayerController স্ক্রিপ্ট যোগ করুন।
    
    **Bot Setup:**
    বটদের জন্য NavMeshAgent ব্যবহার করুন যাতে তারা একা একা চলতে পারে। Window > AI > Navigation থেকে NavMesh Bake করতে ভুলবেন না।`,
    contentEn: `**Creating Terrain/Ground:**
    Add a Plane in the Hierarchy, set scale to (10, 1, 10). Give it the tag "Ground".
    
    **Player Setup:**
    Take a Capsule and name it Player. Add a Rigidbody and your PlayerController script.
    
    **Bot Setup:**
    Use NavMeshAgent for bots so they can move autonomously. Don't forget to Bake NavMesh from Window > AI > Navigation.`
  },
  {
    id: 'ui',
    title: 'UI এবং কন্ট্রোল সেটআপ',
    titleEn: 'UI and Controls Setup',
    category: 'technical',
    icon: '📱',
    content: `মোবাইল গেমের জন্য UI খুবই গুরুত্বপূর্ণ:
    - **Canvas**: Scale with screen size (1920x1080)।
    - **Joystick**: মুভমেন্টের জন্য Floating Joystick ব্যবহার করুন।
    - **Fire Button**: শুটিং করার জন্য বড় গোল বাটন।
    - **Health Bar**: প্লেয়ারের লাইফ দেখানোর জন্য।`,
    contentEn: `UI is critical for mobile games:
    - **Canvas**: Scale with screen size (1920x1080).
    - **Joystick**: Use Floating Joystick for movement.
    - **Fire Button**: A large circular button for shooting.
    - **Health Bar**: To display the player's health.`
  },
  {
    id: 'optimization',
    title: 'অপটিমাইজেশন টিপস',
    titleEn: 'Optimization Tips',
    category: 'extra',
    icon: '⚡',
    content: `গেমটি যাতে সব মোবাইলে ভালো চলে:
    - Shadow Distance কমিয়ে ২০-৩০ রাখুন।
    - Texture সাইজ ৫১২ বা তার কম রাখুন।
    - অপ্রয়োজনীয় বটের সংখ্যা কমান (১০-১৫ টি যথেষ্ট)।
    - Particle Effects খুব কম ব্যবহার করুন।`,
    contentEn: `To ensure the game runs well on all mobiles:
    - Reduce Shadow Distance to 20-30.
    - Keep Texture size at 512 or lower.
    - Reduce unnecessary bot count (10-15 is enough).
    - Use Particle Effects sparingly.`
  },
  {
    id: 'build',
    title: 'বিল্ড সেটিংস (Android)',
    titleEn: 'Build Settings (Android)',
    category: 'extra',
    icon: '📦',
    content: `মোবাইল বিল্ড করার সময়:
    - Platform: Android সিলেক্ট করুন।
    - Minimum API Level: Android 5.0 (API 21)।
    - Scripting Backend: **IL2CPP** (এটি পারফরম্যান্স বাড়ায়)।
    - Target Architectures: **ARM64** সিলেক্ট করুন।`,
    contentEn: `When building for mobile:
    - Platform: Select Android.
    - Minimum API Level: Android 5.0 (API 21).
    - Scripting Backend: **IL2CPP** (improves performance).
    - Target Architectures: Select **ARM64**.`
  }
];
