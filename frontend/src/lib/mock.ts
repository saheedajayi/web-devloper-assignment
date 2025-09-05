// // lib/mock.ts
//
// // Define types
// export interface User {
//     id: number
//     fullName: string
//     email: string
//     address: string
// }
//
// export interface Post {
//     id: number
//     title: string
//     content: string
// }
//
// // Mock data for users
// export const mockUsers: User[] = [
//     {
//         id: 1,
//         fullName: "James Sunderland",
//         email: "james.sunderland@acme.corp",
//         address: "11 Katz St., Pennsylvania, Centralia, M4A2T6",
//     },
//     {
//         id: 2,
//         fullName: "Heather Mayson",
//         email: "h.mayson@acme.corp",
//         address: "24 Lindsey St., British Columbia, Vancouver, N9M2...",
//     },
//     {
//         id: 3,
//         fullName: "Henry Townshend",
//         email: "henry_townsend@acme.corp",
//         address: "10 Rendell St., Ontario, Toronto, M2K3B8",
//     },
//     {
//         id: 4,
//         fullName: "Walter Sullivan",
//         email: "walter.s@acme.corp",
//         address: "9 Wiltse Road, Alberta, Canmore, N9W4H9",
//     },
//     // Add more mock users for pagination testing
//     ...Array.from({ length: 50 }, (_, i) => ({
//         id: i + 5,
//         fullName: `User ${i + 5}`,
//         email: `user${i + 5}@acme.corp`,
//         address: `${i + 5} Test St., Province, City, A1B2C3`,
//     })),
// ]
//
// // Mock posts data
// export const mockPosts: Record<number, Post[]> = {
//     1: [
//         {
//             id: 1,
//             title: "I Got a Letter",
//             content:
//                 "Today I received an unexpected letter in the mail. The handwriting was familiar, yet I couldn't quite place it. As I opened the envelope, memories came flooding back of a time I thought I had forgotten. The letter contained news that would change everything I thought I knew about my past. Sometimes the most ordinary moments can become extraordinary when we least expect them.",
//         },
//         {
//             id: 2,
//             title: "What a Nice Town",
//             content:
//                 "Silent Hill has always been a peculiar place. The fog rolls in thick during the early morning hours, creating an almost ethereal atmosphere that both enchants and unsettles visitors. The locals are friendly enough, though they speak in hushed tones about things that happened long ago. There's something about this town that draws people in, yet makes them want to leave at the same time.",
//         },
//         {
//             id: 3,
//             title: "I Love My Wife, Mary",
//             content:
//                 "Mary has been the light of my life for as long as I can remember. Her laugh fills our small apartment with warmth, and her smile can brighten even the darkest days. We've been through so much together, and I can't imagine facing life's challenges without her by my side. Every morning I wake up grateful for another day with the woman I love more than life itself.",
//         },
//         {
//             id: 4,
//             title: "How can Anyone Eat Pizza at a Time Like This?",
//             content:
//                 "In times of crisis, people react in the strangest ways. While the world seems to be falling apart around us, my neighbor is casually eating pizza on his front porch as if nothing has happened. Maybe there's wisdom in finding normalcy during chaos, or perhaps some people just process stress differently than others. Either way, I can't help but admire his ability to stay calm.",
//         },
//     ],
//     2: [
//         {
//             id: 5,
//             title: "The Art of Motorcycle Maintenance",
//             content:
//                 "There's something deeply satisfying about working with your hands, feeling the weight of tools, and understanding how mechanical things fit together. My old Harley has been my companion for years, and maintaining it has become a form of meditation. Each bolt, each adjustment, each careful cleaning ritual connects me to something larger than myself.",
//         },
//         {
//             id: 6,
//             title: "Finding Peace in Chaos",
//             content:
//                 "Life has a way of throwing curveballs when you least expect them. I've learned that the key to survival isn't avoiding the chaos, but finding your center within it. Whether it's through meditation, exercise, or simply taking a moment to breathe, we all need our anchors in the storm.",
//         },
//         {
//             id: 7,
//             title: "Coffee Shop Chronicles",
//             content:
//                 "The local coffee shop has become my second office. There's something about the ambient noise, the smell of freshly ground beans, and the constant flow of people that sparks creativity. I've written some of my best work sitting in that corner booth, watching the world go by through rain-streaked windows.",
//         },
//     ],
//     3: [
//         {
//             id: 8,
//             title: "Room 302",
//             content:
//                 "My apartment has become both sanctuary and prison. The walls that once provided comfort now seem to close in with each passing day. Strange sounds echo through the building at night, and I've started to question whether what I'm experiencing is real or just a product of isolation and stress.",
//         },
//         {
//             id: 9,
//             title: "The Hole in the Wall",
//             content:
//                 "Today I discovered something that shouldn't exist. A hole in my bathroom wall that wasn't there yesterday. It's perfectly round, about the size of a dinner plate, and when I peer through it, I see things that make no sense. I should call the landlord, but something tells me this isn't a maintenance issue.",
//         },
//         {
//             id: 10,
//             title: "Neighbors",
//             content:
//                 "The people in this building are strange. Mrs. Patterson from 301 hasn't been seen in weeks, yet I still hear her television playing late into the night. The man from 304 only comes out after midnight, and he always carries that same mysterious briefcase. Sometimes I wonder if I'm the only normal person left here.",
//         },
//         {
//             id: 11,
//             title: "Dreams and Reality",
//             content:
//                 "The line between sleeping and waking has become increasingly blurred. Dreams feel more real than reality, and reality feels like a nightmare I can't wake up from. I've started keeping a journal to track which experiences are real, but even that has become unreliable as the entries seem to change when I'm not looking.",
//         },
//         {
//             id: 12,
//             title: "The Superintendent",
//             content:
//                 "Frank the superintendent knows more than he's letting on. Every time I try to ask him about the strange occurrences in the building, he changes the subject or finds an excuse to leave. His eyes hold secrets, and I'm beginning to think he's not just maintaining the building – he's maintaining something much more sinister.",
//         },
//     ],
//     4: [
//         {
//             id: 13,
//             title: "The 21 Sacraments",
//             content:
//                 "There are rituals in this world that most people don't understand. Sacred acts that connect us to something greater, something beyond the mundane existence that traps so many souls. I've been studying these ancient practices, and I believe I'm close to understanding their true purpose.",
//         },
//         {
//             id: 14,
//             title: "Apartment Building Blues",
//             content:
//                 "This building holds so many stories, so many lives intersecting in ways they don't even realize. Each resident is a piece of a larger puzzle, and I'm beginning to see the pattern. The mother and child, the writer, the superintendent – we're all connected by invisible threads of fate.",
//         },
//     ],
// }
