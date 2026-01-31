# ✅ AI SAFETY CHECKLIST - MANDATORY BEFORE ANY CHANGES

## 🚨 **PRE-CHANGE CHECKLIST**

### **Step 1: Documentation Review**
- [ ] ✅ Read AI_INSTRUCTIONS.md completely
- [ ] ✅ Check BUSINESS_CONTENT.md for protected content
- [ ] ✅ Review PROTECTED_FILES.md for file restrictions
- [ ] ✅ Understand the business context and value propositions

### **Step 2: Current State Assessment**
- [ ] ✅ Read the current file content that will be modified
- [ ] ✅ Identify any business-specific content in the file
- [ ] ✅ Note any statistics, contact info, or unique business details
- [ ] ✅ Check if the file is listed in PROTECTED_FILES.md

### **Step 3: Change Planning**
- [ ] ✅ Plan targeted edits instead of full file replacement
- [ ] ✅ Identify which content must be preserved
- [ ] ✅ Determine which content can be safely modified
- [ ] ✅ Plan how to preserve business-specific elements

---

## 🔍 **CONTENT PRESERVATION CHECKLIST**

### **Critical Business Content to Preserve:**
- [ ] ✅ Hero title: "Bridging Science & Tech Trade"
- [ ] ✅ Hero subtitle: "emerging technologies and high-quality refurbished equipment"
- [ ] ✅ Statistics: 45% Growth, 2025 Launch Year, 85% Cost Savings
- [ ] ✅ Navigation: Home, About, Services, **Products**, Contact
- [ ] ✅ Contact information: info@puentescientific.com
- [ ] ✅ Business descriptions and value propositions
- [ ] ✅ Company focus on laboratories and refurbished equipment

### **Content That Can Be Modified:**
- [ ] ✅ Styling and CSS improvements
- [ ] ✅ Adding new features or sections
- [ ] ✅ Improving responsive design
- [ ] ✅ Enhancing animations and interactions
- [ ] ✅ Adding new pages (without modifying existing ones)

---

## 🛠️ **SAFE MODIFICATION TECHNIQUES**

### **Use These Methods:**
- [ ] ✅ `search_replace` for targeted changes
- [ ] ✅ `MultiEdit` for multiple small changes
- [ ] ✅ Adding new content without removing existing
- [ ] ✅ Improving existing content while preserving meaning
- [ ] ✅ Enhancing functionality without changing business logic

### **Avoid These Methods:**
- [ ] ❌ `write` for entire file replacement
- [ ] ❌ Overwriting files with templates
- [ ] ❌ Removing business-specific content
- [ ] ❌ Changing statistics or key numbers
- [ ] ❌ Modifying company descriptions

---

## 🧪 **TESTING CHECKLIST**

### **Before Committing Changes:**
- [ ] ✅ Test changes on localhost (http://localhost:8000)
- [ ] ✅ Verify all business content is preserved
- [ ] ✅ Check that statistics are unchanged
- [ ] ✅ Confirm navigation includes all required items
- [ ] ✅ Test responsive design on different screen sizes
- [ ] ✅ Verify contact information is correct
- [ ] ✅ Check that hero section maintains business focus

### **Functionality Testing:**
- [ ] ✅ All links work correctly
- [ ] ✅ Forms function properly
- [ ] ✅ Navigation is responsive
- [ ] ✅ Loading animations work
- [ ] ✅ No broken images or missing assets

---

## 📝 **COMMIT SAFETY CHECKLIST**

### **Before Committing:**
- [ ] ✅ Use descriptive commit message
- [ ] ✅ Mention what was changed and what was preserved
- [ ] ✅ Reference any business content that was protected
- [ ] ✅ Note any new features or improvements added

### **Example Good Commit Messages:**
- ✅ "Enhance contact form styling while preserving business contact info"
- ✅ "Add loading animations to index.html, preserve hero content and statistics"
- ✅ "Improve responsive design for contact page, maintain all business details"

### **Example Bad Commit Messages:**
- ❌ "Update website"
- ❌ "Modernize design"
- ❌ "Fix issues"

---

## 🚨 **EMERGENCY PROCEDURES**

### **If You Accidentally Overwrite Content:**
1. [ ] ✅ **STOP** - Don't make any more changes
2. [ ] ✅ Check git history: `git log --oneline -10`
3. [ ] ✅ Restore from previous commit: `git show HEAD~1:filename`
4. [ ] ✅ Compare with current version to identify what was lost
5. [ ] ✅ Restore missing content from BUSINESS_CONTENT.md
6. [ ] ✅ Test the restored version thoroughly
7. [ ] ✅ Commit the fix with clear explanation

### **Recovery Commands:**
```bash
# Check what changed
git diff HEAD~1 filename

# Restore from previous commit
git checkout HEAD~1 -- filename

# Or view previous version
git show HEAD~1:filename > filename.backup
```

---

## 📞 **ESCALATION PROCEDURES**

### **When to Ask for Help:**
- [ ] ✅ Unsure about preserving business content
- [ ] ✅ Need to modify critical statistics
- [ ] ✅ Want to change company taglines or descriptions
- [ ] ✅ Planning to replace entire files
- [ ] ✅ Accidentally overwrote important content

### **How to Ask for Help:**
1. Explain what you want to change
2. Identify what business content might be affected
3. Ask for permission before proceeding
4. Wait for confirmation before making changes

---

## 🎯 **SUCCESS CRITERIA**

### **A Safe Change Should:**
- [ ] ✅ Preserve all business-specific content
- [ ] ✅ Maintain company statistics and key numbers
- [ ] ✅ Keep navigation structure intact
- [ ] ✅ Preserve contact information
- [ ] ✅ Maintain business focus and messaging
- [ ] ✅ Improve functionality without breaking existing features
- [ ] ✅ Enhance user experience while preserving business value

---

## 🔄 **POST-CHANGE VERIFICATION**

### **After Making Changes:**
- [ ] ✅ Verify all business content is intact
- [ ] ✅ Test website functionality
- [ ] ✅ Check responsive design
- [ ] ✅ Confirm no broken links or missing content
- [ ] ✅ Update this checklist if new patterns emerge

---

**Remember: When in doubt, ask for permission. It's better to be cautious than to lose important business content that took time and effort to create.**
