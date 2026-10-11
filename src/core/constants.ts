export const SAVE_DATA_SIZE = 0x200;
export const SAVE_SLOT_SIZE = 0x38;
export const SETTINGS_DATA_SIZE = 0x20;

export const NUM_SAVE_SLOTS = 4;
export const NUM_COPIES = 2;
export const COURSE_COUNT = 24;
export const MAIN_COURSE_COUNT = 15;
export const TOTAL_STARS = 120;
export const MAX_STARS_PER_COURSE = 7;

export const SLOT_MAGIC = 0x4441;
export const SETTINGS_MAGIC = 0x4849;

export const SAVE_FLAG_FILE_EXISTS = 1 << 0;
export const SAVE_FLAG_HAVE_WING_CAP = 1 << 1;
export const SAVE_FLAG_HAVE_METAL_CAP = 1 << 2;
export const SAVE_FLAG_HAVE_VANISH_CAP = 1 << 3;
export const SAVE_FLAG_HAVE_KEY_1 = 1 << 4;
export const SAVE_FLAG_HAVE_KEY_2 = 1 << 5;
export const SAVE_FLAG_UNLOCKED_BASEMENT_DOOR = 1 << 6;
export const SAVE_FLAG_UNLOCKED_UPSTAIRS_DOOR = 1 << 7;
export const SAVE_FLAG_DDD_MOVED_BACK = 1 << 8;
export const SAVE_FLAG_MOAT_DRAINED = 1 << 9;
export const SAVE_FLAG_UNLOCKED_PSS_DOOR = 1 << 10;
export const SAVE_FLAG_UNLOCKED_WF_DOOR = 1 << 11;
export const SAVE_FLAG_UNLOCKED_CCM_DOOR = 1 << 12;
export const SAVE_FLAG_UNLOCKED_JRB_DOOR = 1 << 13;
export const SAVE_FLAG_UNLOCKED_BITDW_DOOR = 1 << 14;
export const SAVE_FLAG_UNLOCKED_BITFS_DOOR = 1 << 15;
export const SAVE_FLAG_CAP_ON_GROUND = 1 << 16;
export const SAVE_FLAG_CAP_ON_KLEPTO = 1 << 17;
export const SAVE_FLAG_CAP_ON_UKIKI = 1 << 18;
export const SAVE_FLAG_CAP_ON_MR_BLIZZARD = 1 << 19;
export const SAVE_FLAG_UNLOCKED_50_STAR_DOOR = 1 << 20;
export const SAVE_FLAG_COLLECTED_TOAD_STAR_1 = 1 << 24;
export const SAVE_FLAG_COLLECTED_TOAD_STAR_2 = 1 << 25;
export const SAVE_FLAG_COLLECTED_TOAD_STAR_3 = 1 << 26;
export const SAVE_FLAG_COLLECTED_MIPS_STAR_1 = 1 << 27;
export const SAVE_FLAG_COLLECTED_MIPS_STAR_2 = 1 << 28;

export const COURSE_FLAG_100_COINS = 1 << 6;
export const COURSE_FLAG_CANNON_OPEN = 1 << 7;

export const FLAGS_100_PERCENT = 0x1f10ffcf;

export const COURSE_NAMES: readonly string[] = [
  "Bob-Omb Battlefield",
  "Whomp's Fortress",
  "Jolly Roger Bay",
  "Cool, Cool Mountain",
  "Big Boo's Haunt",
  "Hazy Maze Cave",
  "Lethal Lava Land",
  "Shifting Sand Land",
  "Dire, Dire Docks",
  "Snowman's Land",
  "Wet-Dry World",
  "Tall, Tall Mountain",
  "Tiny-Huge Island",
  "Tick Tock Clock",
  "Rainbow Ride",
  "Bowser in the Dark World",
  "Bowser in the Fire Sea",
  "Bowser in the Sky",
  "Princess's Secret Slide",
  "Cavern of the Metal Cap",
  "Tower of the Wing Cap",
  "Vanish Cap Under the Moat",
  "Winged Mario over the Rainbow",
  "Secret Aquarium"
];

export const COURSE_STAR_COUNTS: readonly number[] = [
  7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
  1, 1, 1, 2, 1, 1, 1, 1, 1
];

export const COURSE_HAS_CANNON: readonly boolean[] = [
  true, true, true, true, false, false, false, true, false, true, true, true, true, false, true,
  false, false, false, false, false, false, false, true, false
];

export const COURSE_STAR_NAMES: readonly (readonly string[])[] = [
  [
    "Big Bob-omb on the Summit",
    "Footrace with Koopa the Quick",
    "Shoot to the Island in the Sky",
    "Find the 8 Red Coins",
    "Mario Wings to the Sky",
    "Behind Chain Chomp's Gate",
    "100 Coins Star"
  ],
  [
    "Chip off Whomp's Block",
    "To the Top of the Fortress",
    "Shoot into the Wild Blue",
    "Red Coins on the Floating Isle",
    "Fall onto the Caged Island",
    "Blast Away the Wall",
    "100 Coins Star"
  ],
  [
    "Plunder in the Sunken Ship",
    "Can the Eel Come out and Play?",
    "Treasure of the Ocean Cave",
    "Red Coins on the Ship Afloat",
    "Blast to the Stone Pillar",
    "Through the Jet Stream",
    "100 Coins Star"
  ],
  [
    "Slip Slidin' Away",
    "Li'l Penguin Lost",
    "Big Penguin Race",
    "Frosty Slide for 8 Red Coins",
    "Snowman's Lost his Head",
    "Wall Kicks will Work",
    "100 Coins Star"
  ],
  [
    "Go on a Ghost Hunt",
    "Ride Big Boo's Merry-Go-Round",
    "Secret of the Haunted Books",
    "Seek the 8 Red Coins",
    "Big Boo's Balcony",
    "Eye to Eye in the Secret Room",
    "100 Coins Star"
  ],
  [
    "Swimming Beast in the Cavern",
    "Elevate for 8 Red Coins",
    "Metal-Head Mario Can Move!",
    "Navigating the Toxic Maze",
    "A-maze-ing Emergency Exit",
    "Watch for the Rolling Rocks",
    "100 Coins Star"
  ],
  [
    "Boil the Big Bully",
    "Bully the Bullies",
    "8-Coin Puzzle with 15 Pieces",
    "Red-Hot Log Rolling",
    "Hot-Foot-It into the Volcano",
    "Elevator Tour in the Volcano",
    "100 Coins Star"
  ],
  [
    "In the Talons of the Big Bird",
    "Shining Atop the Pyramid",
    "Inside the Ancient Pyramid",
    "Stand Tall on the Four Pillars",
    "Free Flying for 8 Red Coins",
    "Pyramid Puzzle",
    "100 Coins Star"
  ],
  [
    "Board Bowser's Sub",
    "Chests in the Current",
    "Pole-Jumping for Red Coins",
    "Through the Jet Stream",
    "The Manta Ray's Reward",
    "Collect the Caps",
    "100 Coins Star"
  ],
  [
    "Snowman's Big Head",
    "Chill with the Bully",
    "In the Deep Freeze",
    "Whirl from the Freezing Pond",
    "Shell Shreddin' for 8 Red Coins",
    "Into the Igloo",
    "100 Coins Star"
  ],
  [
    "Shocking Arrow Lifts!",
    "Top O' The Town",
    "Secrets in the Shallows & Sky",
    "Express Elevators - Hurry Up!",
    "Go to Town for Red Coins",
    "Quick Race through Downtown",
    "100 Coins Star"
  ],
  [
    "Scale the Mountain",
    "Mystery of the Monkey Cage",
    "Scary 'Shrooms, Red Coins",
    "Mysterious Mountainside",
    "Breathtaking View from Bridge",
    "Blast to the Lonely Mushroom",
    "100 Coins Star"
  ],
  [
    "Pluck the Piranha Flower",
    "The Tip Top of the Huge Island",
    "Rematch with Koopa the Quick",
    "Five Itty Bitty Secrets",
    "Wiggler's Red Coins",
    "Make Wiggler Squirm",
    "100 Coins Star"
  ],
  [
    "Roll into the Cage",
    "The Pit and the Pendulums",
    "Get a Hand",
    "Stomp on the Thwomp",
    "Timed Jumps on Moving Bars",
    "Stop Time for Red Coins",
    "100 Coins Star"
  ],
  [
    "Cruiser Crossing the Rainbow",
    "The Big House in the Sky",
    "Coins Amassed in a Maze",
    "Swingin' in the Breeze",
    "Tricky Triangles!",
    "Somewhere over the Rainbow",
    "100 Coins Star"
  ],
  ["8 Red Coins"],
  ["8 Red Coins"],
  ["8 Red Coins"],
  ["Complete the Secret Slide", "Complete the Secret Slide under 21s"],
  ["Get the 8 red coins"],
  ["Get the 8 red coins"],
  ["Get the 8 red coins"],
  ["Get the 8 red coins"],
  ["Get the 8 red coins"]
];

export const SLOT_NAMES = ["Mario A", "Mario B", "Mario C", "Mario D"] as const;
