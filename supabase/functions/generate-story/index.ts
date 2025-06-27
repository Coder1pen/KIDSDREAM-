import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface StoryPrompt {
  main_character: string;
  age_group: string;
  setting: string;
  theme: string;
  additional_details?: string;
}

// Advanced story templates with multiple variations and complexity levels
const advancedStoryTemplates = {
  adventure: {
    free: [
      "Once upon a time, {main_character} discovered a mysterious map hidden in {setting}. The map showed a path to an incredible treasure, but the journey would not be easy.\n\nWith courage in their heart, {main_character} packed a small bag with essentials and set off on the adventure. Along the way, they encountered friendly creatures who offered helpful advice and warnings about the challenges ahead.\n\nThe first challenge was crossing a rushing river. {main_character} had to think creatively, using fallen logs and stepping stones to make it safely across. Each obstacle taught valuable lessons about perseverance and problem-solving.\n\nAs the sun began to set, {main_character} finally reached the treasure's location. But the real treasure wasn't gold or jewels - it was the confidence gained from overcoming fears and the wonderful memories of an incredible adventure.\n\nReturning home with a heart full of joy, {main_character} knew that this was just the beginning of many amazing adventures to come.",
      
      "In the heart of {setting}, {main_character} heard whispers of an ancient legend about a magical artifact that could grant one special wish. Intrigued by the possibility, {main_character} decided to embark on a quest to find this legendary item.\n\nThe journey led through enchanted forests, across sparkling streams, and up towering mountains. At each location, {main_character} met wise guardians who presented riddles and challenges that tested not just intelligence, but also kindness and bravery.\n\nDuring the most difficult part of the journey, when {main_character} felt like giving up, a small voice whispered words of encouragement. It was the spirit of {setting} itself, reminding {main_character} that the greatest adventures come to those who never stop believing in themselves.\n\nWhen {main_character} finally found the magical artifact, they realized that the real magic had been growing inside them all along - the magic of determination, compassion, and self-belief. The wish they made was not for themselves, but for all the friends they had made along the way."
    ],
    premium: [
      "In the mystical realm of {setting}, where ancient magic flows through every grain of sand and whisper of wind, {main_character} awakened to discover they possessed an extraordinary gift - the ability to communicate with the very essence of nature itself.\n\nThis newfound power came with great responsibility, as the delicate balance of {setting} was threatened by a mysterious shadow that was slowly draining the life force from everything it touched. The Council of Elders, comprised of the wisest beings in the realm, sought {main_character}'s help to restore harmony.\n\nThe quest would require {main_character} to master three ancient arts: the Art of Listening (understanding the language of wind and water), the Art of Seeing (perceiving the invisible connections between all living things), and the Art of Being (finding inner peace to channel pure magical energy).\n\nEach trial took place in a different region of {setting}. In the Crystal Caverns, {main_character} learned to hear the songs of ancient stones that held memories of the world's creation. In the Whispering Woods, they discovered how to see the golden threads that connect every living creature in an intricate web of life. Finally, in the Sacred Grove, {main_character} found the inner stillness needed to become a conduit for the realm's healing energy.\n\nThe final confrontation with the shadow revealed a surprising truth - it wasn't evil, but rather a lost part of {setting} itself, separated long ago and forgotten. Through compassion and understanding, {main_character} helped reunite the shadow with the light, restoring balance and teaching everyone that sometimes what appears to be our greatest enemy is simply a part of ourselves that needs healing.\n\nAs the realm celebrated its restoration, {main_character} was honored not as a conqueror, but as a healer and bridge-builder. The adventure had transformed not just {setting}, but {main_character} as well, who now understood that true power comes from unity, empathy, and the courage to see beyond surface appearances.\n\nThe story became legend, inspiring future generations to look for the magic within themselves and to remember that every ending is simply a new beginning in disguise."
    ]
  },
  
  friendship: {
    free: [
      "{main_character} had just moved to {setting} and felt quite lonely. Everything was new and different, and making friends seemed impossible.\n\nOne day, while exploring the neighborhood, {main_character} noticed someone sitting alone, looking just as lonely. Gathering courage, {main_character} approached and offered to share a snack.\n\nThat simple act of kindness sparked a beautiful friendship. They discovered they both loved the same games, had similar dreams, and could make each other laugh even on difficult days.\n\nTogether, they explored every corner of {setting}, creating secret hideouts and sharing countless adventures. When one felt sad, the other was always there with comfort and support.\n\nAs seasons changed, their friendship grew stronger. {main_character} learned that the best friendships aren't about finding someone exactly like you, but about finding someone who accepts and celebrates who you are."
    ],
    premium: [
      "In the vibrant community of {setting}, {main_character} possessed a unique gift - the ability to see the invisible threads of connection that link all hearts together. These shimmering strands appeared as golden light whenever genuine friendship was present, but lately, {main_character} noticed that many of these threads were fading throughout their community.\n\nDetermined to understand why friendships were weakening, {main_character} embarked on a journey of discovery that would take them through different neighborhoods, schools, and gathering places in {setting}. At each location, they encountered individuals who had lost touch with the art of true friendship.\n\nThere was Maya, a brilliant artist who had become so focused on perfection that she pushed away anyone who tried to help. There was Sam, a talented athlete who had forgotten how to celebrate others' successes. And there was Alex, a kind soul who had been hurt so many times that they had built walls around their heart.\n\n{main_character} realized that healing these broken connections would require more than just bringing people together - it would require teaching them the ancient wisdom of friendship: the courage to be vulnerable, the strength to forgive, the joy of celebrating others, and the patience to grow together through both good times and challenges.\n\nUsing their gift, {main_character} organized a series of community events that weren't just fun activities, but carefully designed experiences that helped people rediscover their capacity for genuine connection. The Art Festival allowed Maya to collaborate and see beauty in imperfection. The Community Sports Day taught Sam the joy of teamwork over individual glory. The Storytelling Circle gave Alex a safe space to share their experiences and realize they weren't alone.\n\nAs the golden threads of friendship began to reappear and strengthen throughout {setting}, {main_character} discovered something wonderful - their own gift had grown stronger too. They could now not only see the threads of friendship but could help weave new ones, creating a network of connection that made their entire community more resilient, joyful, and loving.\n\nThe transformation of {setting} became a model for other communities, and {main_character} became known as the Friendship Weaver, traveling to help other places rediscover the magic of genuine human connection. But they always returned home to {setting}, where the strongest threads of all connected them to their own circle of beloved friends."
    ]
  },
  
  magic: {
    free: [
      "In {setting}, magic was everywhere, but only {main_character} seemed to notice the tiny sparkles that danced in the air like invisible fireflies.\n\nOne evening, these magical sparkles began behaving strangely, swirling and spinning in patterns that seemed to be trying to communicate something important. Following their lead, {main_character} was guided to a hidden door that appeared only in moonlight.\n\nBeyond the door lay a world where flowers sang lullabies, trees told ancient stories, and friendly magical creatures needed help solving a problem that threatened their peaceful existence.\n\nWith wisdom beyond their years, {main_character} listened carefully to understand the problem and worked with the magical beings to find a solution that would restore harmony to their enchanted world.\n\nWhen the task was complete, the grateful creatures granted {main_character} the ability to visit whenever needed, creating a special bond between the ordinary world and the realm of magic."
    ],
    premium: [
      "In the ancient realm of {setting}, where the very fabric of reality was woven from threads of pure magic, {main_character} discovered they were the last in a long line of Dreamweavers - mystical beings capable of bringing imagination into physical reality through the power of lucid dreaming.\n\nThis extraordinary heritage came with both incredible potential and grave responsibility. The Dreamweaver's power had been dormant for generations because the previous guardian had sealed it away to prevent its misuse. Now, as dark nightmares began seeping from the dream realm into the waking world, threatening to engulf {setting} in eternal shadow, {main_character} was the only one who could restore the balance.\n\nThe journey to master the Dreamweaver arts required {main_character} to navigate seven distinct layers of consciousness, each presenting unique challenges and revelations:\n\nThe Layer of Memory, where {main_character} had to confront and heal painful experiences from the past, learning that even difficult memories contain wisdom and strength.\n\nThe Layer of Fear, where every anxiety and worry took physical form, teaching {main_character} that courage isn't the absence of fear, but the decision to act despite it.\n\nThe Layer of Desire, where {main_character} faced the temptation of unlimited power and learned the importance of using abilities for the greater good rather than personal gain.\n\nThe Layer of Truth, where all illusions fell away and {main_character} saw themselves and the world with perfect clarity, understanding their true purpose and potential.\n\nThe Layer of Connection, where {main_character} experienced the profound interconnectedness of all beings and learned that individual power is meaningless without compassion and community.\n\nThe Layer of Creation, where {main_character} learned to weave dreams into reality with precision and artistry, understanding that every creation carries the creator's intention and responsibility.\n\nFinally, the Layer of Transcendence, where {main_character} merged temporarily with the cosmic consciousness that governs all dreams and realities, gaining the wisdom needed to heal the rift between worlds.\n\nThe climactic battle against the nightmare entities wasn't won through force, but through {main_character}'s realization that the nightmares were actually corrupted dreams - hopes and aspirations that had been twisted by despair and abandonment. By approaching them with understanding and compassion, {main_character} was able to heal and transform them back into beautiful dreams.\n\nThe restoration of balance between the dream and waking worlds transformed {setting} into a place where imagination and reality danced together in perfect harmony. Children's drawings came to life as helpful companions, poets' words created actual bridges between hearts, and inventors' dreams materialized as solutions to age-old problems.\n\n{main_character}, now a fully realized Dreamweaver, established a school where others could learn to harness the power of conscious dreaming for healing, creativity, and positive transformation. The legacy of the Dreamweavers was no longer a burden carried by one, but a gift shared by many, ensuring that the magic of dreams would forever enrich the waking world."
    ]
  },
  
  learning: {
    free: [
      "{main_character} was the most curious person in all of {setting}, always asking questions about everything they encountered.\n\nOne day, this curiosity led to an amazing discovery - a wise old owl who had spent centuries collecting knowledge and was looking for someone eager to learn.\n\nThe owl became {main_character}'s mentor, teaching not just facts and information, but how to think critically, ask better questions, and find joy in the process of discovery.\n\nThrough various adventures and experiments, {main_character} learned that knowledge isn't just about having the right answers, but about asking the right questions and never stopping the journey of learning.\n\nBy the end of their time together, {main_character} had become a teacher too, sharing knowledge with others and inspiring them to embrace their own curiosity."
    ],
    premium: [
      "In the magnificent {setting}, where knowledge itself took physical form as glowing orbs of light that floated through the air, {main_character} discovered they possessed the rare gift of Knowledge Synthesis - the ability to combine different types of learning to create entirely new understanding.\n\nThis gift manifested when {main_character} was chosen by the Great Library of {setting}, a living entity that contained not just books and scrolls, but the accumulated wisdom of countless civilizations. The Library was dying, its knowledge becoming fragmented and disconnected, threatening to plunge the world into an age of ignorance and confusion.\n\nTo save the Library, {main_character} had to embark on the Quest of Seven Wisdoms, each representing a different way of understanding the world:\n\nThe Wisdom of Science, found in the Crystal Observatory where {main_character} learned to observe, hypothesize, and experiment, discovering that the universe operates according to beautiful, discoverable patterns.\n\nThe Wisdom of Art, discovered in the Gallery of Emotions where {main_character} learned that creativity and beauty are not luxuries but essential ways of understanding and expressing truth about the human experience.\n\nThe Wisdom of History, uncovered in the Hall of Time where {main_character} walked through recreated moments from the past, learning that understanding where we came from is crucial to knowing where we're going.\n\nThe Wisdom of Mathematics, revealed in the Garden of Numbers where abstract concepts bloomed as living flowers, showing {main_character} that mathematics is the language of the universe's deepest patterns.\n\nThe Wisdom of Philosophy, found in the Thinking Maze where {main_character} grappled with life's biggest questions and learned that sometimes the journey toward an answer is more valuable than the answer itself.\n\nThe Wisdom of Empathy, discovered in the Mirror of Souls where {main_character} experienced life from countless different perspectives, learning that true understanding requires the ability to see through others' eyes.\n\nThe Wisdom of Integration, achieved in the Center of All Knowledge where {main_character} learned to weave all forms of understanding together into a coherent, living tapestry of wisdom.\n\nAs {main_character} mastered each wisdom, they began to see how all knowledge is interconnected. Science informed art, history illuminated philosophy, mathematics revealed beauty, and empathy made all learning meaningful. The fragmented knowledge orbs in the Library began to reconnect, forming brilliant constellations of understanding.\n\nThe climax came when {main_character} realized that the Library wasn't dying from lack of information, but from lack of connection - both between different types of knowledge and between knowledge and the people who needed it. Using their gift of Knowledge Synthesis, {main_character} transformed the Library from a repository of static information into a living network that could adapt, grow, and reach out to learners wherever they were.\n\nThe renewed Library sent out seeds of knowledge that took root throughout {setting}, growing into smaller learning centers that made wisdom accessible to everyone. {main_character} became the first Synthesis Scholar, teaching others not just what to learn, but how to connect their learning to create new insights and solutions.\n\nThe transformation of {setting} into a true learning society, where curiosity was celebrated and knowledge was shared freely, became a beacon for other communities. {main_character}'s greatest lesson - that learning is not about accumulating facts but about building bridges between ideas and people - spread far beyond {setting}, inspiring a renaissance of integrated wisdom that enriched the entire world."
    ]
  },
  
  animals: {
    free: [
      "In {setting}, {main_character} discovered they had a special gift - the ability to understand what animals were saying.\n\nThis amazing ability led to wonderful friendships with creatures great and small. {main_character} learned that animals have their own wisdom, emotions, and important things to say.\n\nWhen the animals faced a problem that threatened their home, {main_character} became their voice, helping humans understand the animals' needs and finding solutions that worked for everyone.\n\nThrough these experiences, {main_character} learned about the importance of protecting nature and treating all living creatures with respect and kindness."
    ],
    premium: [
      "In the biodiverse sanctuary of {setting}, {main_character} awakened to discover they possessed the ancient gift of the Beast Speakers - the ability not only to communicate with animals but to understand the complex web of relationships that connects all living beings in the ecosystem.\n\nThis gift came with a profound responsibility, as {main_character} learned they were the bridge between the human world and the animal kingdom during a time of great crisis. Climate changes, habitat destruction, and human expansion had disrupted the delicate balance that had existed for millennia, and the animals had chosen {main_character} as their ambassador to help restore harmony.\n\nThe journey began when {main_character} was summoned by the Council of Species - a gathering of the wisest animals from every habitat in {setting}. Each species presented a piece of a larger puzzle:\n\nThe Ancient Tortoise shared memories spanning centuries, revealing how the land had changed and what needed to be restored. The Migrating Birds brought news from distant places, showing how problems in {setting} affected the entire world. The Busy Bees explained the intricate connections between plants and pollinators that kept the ecosystem functioning. The Wise Wolves demonstrated the importance of predator-prey relationships in maintaining natural balance.\n\nBut the most important lesson came from the smallest creatures - the insects, microorganisms, and tiny fish that most humans never noticed. They taught {main_character} that every being, no matter how small, plays a crucial role in the web of life.\n\nAs {main_character} learned to see through the eyes of different species, they began to understand that the crisis wasn't just about saving individual animals, but about healing the relationships between all living things, including humans. The solution required not just conservation, but transformation - finding ways for human communities to live as part of the ecosystem rather than separate from it.\n\nWorking with both animals and humans, {main_character} helped design innovative solutions: urban gardens that provided food for both people and wildlife, building designs that incorporated animal habitats, transportation systems that respected migration routes, and farming methods that worked with natural cycles rather than against them.\n\nThe most challenging part of the mission was helping humans remember their own place in the natural world. {main_character} organized experiences where people could safely interact with animals, learning to see them not as resources or obstacles, but as neighbors and teachers with their own intelligence and wisdom.\n\nAs the relationship between humans and animals in {setting} began to heal, something magical happened. The ecosystem didn't just survive - it thrived in new ways. Biodiversity increased, natural cycles stabilized, and both human and animal communities became more resilient and healthy.\n\n{main_character} established the first Inter-Species Council, where representatives from both human and animal communities could meet regularly to make decisions that affected their shared home. This model spread to other regions, creating a network of places where the ancient partnership between humans and nature was being renewed.\n\nThe story of {setting} became proof that when humans remember their role as caretakers rather than conquerors of nature, both species and ecosystems can flourish together, creating a world that is more beautiful, sustainable, and alive than either could achieve alone."
    ]
  },
  
  family: {
    free: [
      "In {setting}, {main_character} lived with a wonderful family where everyone was different but loved each other deeply.\n\nWhen the family decided to create something special together, {main_character} wasn't sure what they could contribute. Everyone else seemed to have obvious talents and skills.\n\nThrough the process of working together, {main_character} discovered that their special gift was bringing out the best in others and helping the family work as a team.\n\nThe project became more beautiful than anyone had imagined, not because of individual talents, but because of how those talents combined when guided by love and cooperation."
    ],
    premium: [
      "In the multigenerational community of {setting}, where families of all shapes and sizes lived in harmony, {main_character} discovered they possessed the gift of Family Weaving - the ability to see and strengthen the invisible bonds that connect people across generations, cultures, and chosen family relationships.\n\nThis gift revealed itself during the Festival of Roots, an annual celebration where families shared their histories and traditions. {main_character} could see the golden threads that connected family members - some strong and bright, others frayed or tangled, and some completely broken, leaving individuals feeling isolated and lost.\n\nThe community was facing a crisis of disconnection. Rapid changes in technology and society had created gaps between generations. Traditional families were scattered across great distances. New families formed by choice rather than birth struggled to create their own traditions. Many people, especially elders and young adults, felt like they didn't belong anywhere.\n\nRecognizing that {main_character}'s gift could help heal these fractures, the Council of Elders asked them to undertake the Great Mending - a journey to understand and repair the various types of family bonds that make communities strong.\n\nThe quest took {main_character} through seven different family structures, each teaching important lessons:\n\nThe Traditional Family taught the importance of honoring ancestors and passing down wisdom through generations, showing how family stories and rituals create continuity and identity.\n\nThe Chosen Family demonstrated that love and commitment can create bonds as strong as blood, and that families can be formed by shared values and mutual care rather than just genetics.\n\nThe Blended Family showed how different traditions and backgrounds can be woven together to create something new and beautiful, stronger than any single thread.\n\nThe Single-Parent Family revealed the incredible strength that comes from necessity and the importance of community support in raising children.\n\nThe Adoptive Family taught that love transcends biology and that every child deserves to belong somewhere, while every parent's heart has infinite capacity for love.\n\nThe Extended Family illustrated how aunts, uncles, grandparents, and cousins create a network of support and belonging that extends far beyond the immediate household.\n\nThe Community Family showed how neighbors, teachers, mentors, and friends can become family, creating villages that raise children and support adults throughout their lives.\n\nAs {main_character} learned from each family type, they developed new techniques for strengthening family bonds: Storytelling Circles that helped families share their histories, Tradition Fusion workshops that helped blended families create new customs, Mentorship Programs that connected elders with young people, and Community Dinners that brought different families together.\n\nThe most profound discovery came when {main_character} realized that their own family - which they had always seen as ordinary - was actually a beautiful example of how different types of family bonds could coexist and strengthen each other. Their biological relatives, chosen family members, mentors, and community connections all formed a rich tapestry of belonging.\n\nThe Great Mending culminated in the creation of the Family Tree of {setting} - not a traditional genealogical chart, but a living artwork that showed how every person in the community was connected to others through various types of family relationships. The tree grew and changed as new connections formed and existing ones strengthened.\n\n{main_character} became the community's Family Weaver, helping individuals and families navigate challenges, celebrate milestones, and build stronger connections. They established the Family Healing Center, where people could come to work on repairing damaged relationships, grieving lost connections, or building new ones.\n\nThe transformation of {setting} into a place where everyone belonged to multiple, overlapping families created a model of community resilience that spread to other places. {main_character}'s work showed that in a world of rapid change and mobility, the human need for family connection could be met in many different ways, as long as communities were intentional about creating and nurturing these bonds."
    ]
  },
  
  bedtime: {
    free: [
      "As the stars began to twinkle over {setting}, {main_character} prepared for a peaceful night's sleep.\n\nThe evening routine was filled with gentle activities: a warm bath, cozy pajamas, and a few minutes of quiet reflection on the day's adventures.\n\nAs {main_character} settled into bed, the room filled with a sense of safety and comfort. Outside, the night sounds of {setting} created a gentle lullaby.\n\nDrifting off to sleep, {main_character} began to dream of wonderful adventures, knowing that tomorrow would bring new discoveries and joy."
    ],
    premium: [
      "In the twilight realm of {setting}, where the boundary between waking and dreaming grows thin as night approaches, {main_character} discovered they were a Guardian of Sleep - one of the special beings chosen to protect the sacred transition from day to night and ensure peaceful rest for all.\n\nThis extraordinary responsibility revealed itself when {main_character} noticed that many people in {setting} were struggling with sleep. Children had nightmares, adults lay awake with worries, and elders found their rest disturbed by memories and concerns. The very fabric of the dream world was becoming frayed, allowing anxiety and fear to seep into what should be a time of restoration and peace.\n\nThe Guardian of Sleep's duties were both mystical and practical, requiring {main_character} to master the Seven Arts of Peaceful Rest:\n\nThe Art of Twilight Preparation, learning to create environments and routines that signal to both body and mind that it's time to transition from the activity of day to the rest of night.\n\nThe Art of Worry Weaving, discovering how to take the day's concerns and transform them into a protective blanket of resolved thoughts, ensuring that problems don't follow people into their dreams.\n\nThe Art of Memory Blessing, helping people process the day's experiences in a way that honors both joys and challenges while releasing any negative energy that might disturb sleep.\n\nThe Art of Dream Seeding, planting positive intentions and beautiful images in the mind before sleep, so that dreams become gardens of creativity, healing, and inspiration rather than battlegrounds of fear.\n\nThe Art of Night Watching, maintaining vigilance over the sleeping community, gently guiding away any nightmares or disturbances that might threaten peaceful rest.\n\nThe Art of Dawn Welcoming, ensuring that the transition from sleep to waking is gentle and refreshing, so that people wake feeling restored and ready for new adventures.\n\nThe Art of Sleep Storytelling, weaving tales that carry listeners gently into slumber while filling their subconscious with wisdom, comfort, and hope.\n\nAs {main_character} mastered these arts, they began to understand that sleep is not just rest, but a sacred time when the mind processes experiences, the body heals itself, and the spirit connects with deeper wisdom. Protecting this time was protecting people's ability to grow, learn, and find peace.\n\nThe most challenging part of being a Guardian of Sleep was helping people who had forgotten how to rest. In a world full of constant stimulation and endless worries, many had lost the natural rhythm of day and night. {main_character} had to teach them ancient techniques: breathing exercises that calm the nervous system, meditation practices that quiet racing thoughts, and visualization methods that create inner sanctuaries of peace.\n\n{main_character} also worked with the dream realm itself, healing the pathways between conscious and unconscious mind that had become blocked or corrupted. They learned to enter people's dreams not to control them, but to clear away obstacles and create space for natural healing and creativity to occur.\n\nThe transformation of sleep in {setting} had effects that rippled through the entire community. When people slept well, they were more creative, compassionate, and resilient during their waking hours. Children learned better, adults worked more effectively, and elders found peace with their memories. The entire rhythm of community life became more harmonious.\n\n{main_character} established the Sanctuary of Rest, a place where people could come to learn healthy sleep practices, work through sleep difficulties, and experience the deep restoration that comes from truly peaceful rest. They also trained other Guardians of Sleep, ensuring that this ancient wisdom would be preserved and shared.\n\nThe story of {main_character}'s work spread to other communities, inspiring a renaissance of respect for sleep and dreams as essential parts of human wellbeing. In a world that often glorified constant activity and stimulation, {main_character} reminded everyone that rest is not laziness but wisdom, and that in the quiet darkness of night, some of life's most important healing and growth takes place.\n\nAs {main_character} settled into their own peaceful sleep each night, they were surrounded by the gentle breathing of a community at rest, knowing that their work as Guardian of Sleep had helped create a place where everyone could find the restoration they needed to face each new day with hope and energy."
    ]
  }
};

// Function to select appropriate story template based on subscription tier
function selectStoryTemplate(theme: string, isPremium: boolean): string {
  const themeTemplates = advancedStoryTemplates[theme as keyof typeof advancedStoryTemplates];
  if (!themeTemplates) {
    return advancedStoryTemplates.adventure.free[0];
  }
  
  if (isPremium && themeTemplates.premium) {
    const premiumTemplates = themeTemplates.premium;
    return premiumTemplates[Math.floor(Math.random() * premiumTemplates.length)];
  } else {
    const freeTemplates = themeTemplates.free;
    return freeTemplates[Math.floor(Math.random() * freeTemplates.length)];
  }
}

// Enhanced story customization function
function generateAdvancedStory(prompt: StoryPrompt, isPremium: boolean = false): string {
  const template = selectStoryTemplate(prompt.theme, isPremium);
  
  let story = template.replaceAll("{main_character}", prompt.main_character)
                      .replaceAll("{setting}", prompt.setting);
  
  // Age-appropriate customizations
  if (prompt.age_group === "3-5") {
    // Simpler language and shorter sentences for younger children
    story = story.replace(/\. /g, ".\n\n");
    story = story.replace(/([.!?])\s*([A-Z])/g, "$1\n\n$2");
  } else if (prompt.age_group === "9-12") {
    // More complex vocabulary and concepts for older children
    story = story.replace(/wonderful/g, "extraordinary");
    story = story.replace(/amazing/g, "remarkable");
    story = story.replace(/happy/g, "delighted");
  }
  
  // Add custom details with more sophisticated integration
  if (prompt.additional_details && prompt.additional_details.trim().length > 0) {
    const details = prompt.additional_details.trim();
    
    if (isPremium) {
      // For premium users, weave details throughout the story
      const sentences = story.split('. ');
      const insertPoint = Math.floor(sentences.length * 0.3); // Insert at 30% through the story
      sentences.splice(insertPoint, 0, `What made this adventure even more special was that ${details}`);
      story = sentences.join('. ');
      
      // Add another detail integration point
      const secondInsertPoint = Math.floor(sentences.length * 0.7);
      sentences.splice(secondInsertPoint, 0, `Throughout the journey, the presence of ${details} added an extra layer of magic and meaning to every moment`);
      story = sentences.join('. ');
    } else {
      // For free users, add details at the end
      story += `\n\nWhat made this adventure even more special was that ${details}, adding an extra touch of magic to ${prompt.main_character}'s incredible journey.`;
    }
  }
  
  // Add premium enhancements
  if (isPremium) {
    // Add sensory details
    story = story.replace(/walked/g, "walked gracefully");
    story = story.replace(/looked/g, "gazed thoughtfully");
    story = story.replace(/said/g, "spoke with wisdom");
    
    // Add emotional depth
    story = story.replace(/happy/g, "filled with profound joy");
    story = story.replace(/sad/g, "touched by gentle melancholy");
    story = story.replace(/excited/g, "thrilled with anticipation");
  }
  
  return story;
}

// Enhanced title generation with more variety
function generateAdvancedTitle(prompt: StoryPrompt, isPremium: boolean = false): string {
  const basicTitles = [
    `${prompt.main_character}'s ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Adventure`,
    `The Magical ${prompt.setting}`,
    `${prompt.main_character} and the ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Quest`,
    `Journey to the ${prompt.setting}`,
    `The ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} of ${prompt.main_character}`,
  ];
  
  const premiumTitles = [
    `${prompt.main_character} and the Chronicles of ${prompt.setting}`,
    `The Legendary Tales of ${prompt.main_character}: A ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Saga`,
    `Beyond the Realm of ${prompt.setting}: ${prompt.main_character}'s Epic Journey`,
    `The Mystical Adventures of ${prompt.main_character} in the ${prompt.setting}`,
    `${prompt.main_character}: Guardian of ${prompt.setting} and Master of ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)}`,
    `The Enchanted Chronicles: How ${prompt.main_character} Discovered the Secrets of ${prompt.setting}`,
    `${prompt.main_character} and the Ancient Wisdom of ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)}`,
  ];
  
  const titles = isPremium ? premiumTitles : basicTitles;
  return titles[Math.floor(Math.random() * titles.length)];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    const { prompt, isPremium = false } = await req.json();
    
    if (!prompt || !prompt.main_character || !prompt.age_group || !prompt.setting || !prompt.theme) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    // Generate the advanced story content
    const content = generateAdvancedStory(prompt, isPremium);
    const title = generateAdvancedTitle(prompt, isPremium);
    
    return new Response(
      JSON.stringify({
        title,
        content,
        created_at: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});