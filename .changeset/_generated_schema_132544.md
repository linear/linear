---
"@linear/sdk": minor
---


feat(schema): [dangerous] Input field 'initiativeUpdate' was added to input object type 'CommentCollectionFilter' (CommentCollectionFilter.initiativeUpdate)

feat(schema): [dangerous] Input field 'initiativeUpdate' was added to input object type 'CommentFilter' (CommentFilter.initiativeUpdate)

feat(schema): [dangerous] Input field 'initiativeUpdate' was added to input object type 'NullableCommentFilter' (NullableCommentFilter.initiativeUpdate)

feat(schema): [non_breaking] Type 'AiConversationUserState' was added (AiConversationUserState)

feat(schema): [non_breaking] Type 'NullableInitiativeUpdateFilter' was added (NullableInitiativeUpdateFilter)

feat(schema): [non_breaking] Field 'userState' was added to object type 'AiConversation' (AiConversation.userState)

feat(schema): [non_breaking] Field 'Team.ledInitiativeCount' description changed from 'The number of initiatives led by this team that would be deleted along with it. Requires team owner or workspace admin permissions, as it counts initiatives the caller may not otherwise have access to.' to 'The number of initiatives led by this team that would be deleted along with it. Counts every led initiative, including ones not otherwise visible to the caller, to mirror what deleting the team cascades.' (Team.ledInitiativeCount)